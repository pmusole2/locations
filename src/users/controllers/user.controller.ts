import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserObj } from '../interfaces/user.interface';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: [UserObj],
  })
  async getUsers() {
    return await this._userService.getUsers();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'User id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: UserObj,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this._userService.getUserById(id);
  }

  @Post()
  @ApiBody({
    type: UserDto,
    description: 'User data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserObj,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createUser(@Body() user: UserDto): Promise<User> {
    return await this._userService.create(user);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'User id',
    required: true,
  })
  @ApiBody({
    type: UserObj,
    description: 'User data',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserObj,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return await this._userService.update(id, user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'User id',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this._userService.delete(id);
  }
}
