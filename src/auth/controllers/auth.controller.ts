import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthPayload,
  LoginDTO,
  RequestWithUser,
  UserObj,
} from 'src/users/interfaces/user.interface';
import { JwtGuard } from '../guards/Auth.Guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentification')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDTO,
    description: 'Login with email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthPayload,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async loginUser(val: LoginDTO): Promise<AuthPayload> {
    return await this.authService.loginUser(val);
  }

  @Get('current')
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserObj,
  })
  @ApiResponse({
    status: 401,
    description: 'Please login to continue',
  })
  async getCurrentUser(@Req() req: RequestWithUser): Promise<UserObj> {
    return await this.authService.getCurrentUser(req.user.id);
  }
}
