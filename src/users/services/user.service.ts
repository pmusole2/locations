import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon from 'argon2';
import { User } from '../models/user.entity';
import { UserDto } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly _logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _configService: ConfigService,
  ) {}

  async getUserWithPassword(email: string) {
    try {
      const user = await this._userRepo
        .createQueryBuilder('user')
        .select('user')
        .addSelect('user.password')
        .leftJoinAndSelect('user.payer', 'payer')
        .leftJoinAndSelect('user.insuranceCompany', 'insuranceCompany')
        .leftJoinAndSelect('user.members', 'members')
        .where('user.email = :email', { email })
        .getOne();

      if (!user) throw new UnauthorizedException('Invalid credentials');

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getUser(email: string) {
    try {
      const user = await this._userRepo
        .createQueryBuilder('user')
        .select('user')
        .leftJoinAndSelect('user.payer', 'payer')
        .leftJoinAndSelect('user.insuranceCompany', 'insuranceCompany')
        .leftJoinAndSelect('user.members', 'members')
        .where('user.email = :email', { email })
        .getOne();

      if (!user) throw new UnauthorizedException('Invalid credentials');

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await this._userRepo
        .createQueryBuilder('user')
        .select('user')
        .leftJoinAndSelect('user.payer', 'payer')
        .leftJoinAndSelect('user.insuranceCompany', 'insuranceCompany')
        .leftJoinAndSelect('user.members', 'members')
        .getMany();

      return users;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this._userRepo
        .createQueryBuilder('user')
        .select('user')
        .leftJoinAndSelect('user.payer', 'payer')
        .leftJoinAndSelect('user.insuranceCompany', 'insuranceCompany')
        .leftJoinAndSelect('user.members', 'members')
        .where('user.id = :id', { id })
        .getOne();

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async create(val: UserDto) {
    try {
      const oldUser = await this._userRepo.findOne({
        where: { email: val.email },
      });

      if (oldUser)
        throw new BadRequestException(
          `User with email ${val.email} already exists`,
        );

      const user = await this._userRepo.create(val).save();

      // TODO: Send email to user

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async register(val: User) {
    try {
      const oldUser = await this.getUser(val.email);

      if (oldUser)
        throw new BadRequestException(
          `User with email ${val.email} already exists`,
        );

      val.password = await argon.hash(val.password);

      const user = await this._userRepo.create({
        ...val,
      });

      await user.save();

      // TODO: Send email to user

      return user;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async update(id: number, val: Partial<User>) {
    try {
      const user = await this.getUserById(id);

      if (!user) throw new BadRequestException('User not found');

      if (val.password) {
        val.password = await argon.hash(val.password);
      }

      const updatedUser = await this._userRepo.save({
        ...user,
        ...val,
      });

      return updatedUser;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async addPassword(id: number, password: string) {
    try {
      const user = await this.getUserById(id);

      if (!user) throw new BadRequestException('User not found');

      user.password = await argon.hash(password);

      const updatedUser = await this._userRepo.save(user);

      return updatedUser;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.getUserById(id);

      if (!user) throw new BadRequestException('User not found');

      return !!user.softRemove();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
