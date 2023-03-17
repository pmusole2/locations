import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsObject,
} from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';

export enum AccountType {
  MEMBER = 'Member',
  PROVIDER = 'Provider',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
}

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType?: AccountType;
}

export class UserObj extends CommonMetadata implements UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;
}

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}

export class UserPayload
  extends CommonMetadata
  implements Omit<UserObj, 'password'>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;
}

export class AuthPayload {
  @ApiProperty()
  @IsObject()
  @Type(() => UserPayload)
  user: UserPayload;

  @ApiProperty()
  @IsString()
  token: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PasswordReset {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class AccountVerification {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export interface RequestWithUser extends Request {
  user: UserObj;
}
