import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.entity';
import { UserService } from '../../users/services/user.service';
import {
  LoginDTO,
  AuthPayload,
  JwtPayload,
} from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly _logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
  ) {}

  public async loginUser(val: LoginDTO): Promise<AuthPayload> {
    try {
      const user = await this._userService.getUserWithPassword(val.email);

      const passwordMatched = await argon.verify(user.password, val.password);

      if (!passwordMatched)
        throw new UnauthorizedException(`Invalid Credentials`);

      const { accessToken } = await this.signTokenPayload(user.id);

      // user.lastLogin = new Date();

      delete user.password;

      return {
        user,
        token: accessToken,
      };
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getCurrentUser(id: number): Promise<User> {
    try {
      const user = await this._userService.getUserById(id);

      if (!user) throw new UnauthorizedException(`Please login to continue`);

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async signTokenPayload(id: number) {
    const [accessToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: id,
        },
        {
          secret: this._configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: `1 week`,
        },
      ),
    ]);

    return {
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    try {
      return await this._userService.getUserById(payload.sub);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
