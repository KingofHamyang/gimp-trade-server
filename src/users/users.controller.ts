import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.findById(id)
    } catch (err) {
      throw new Error(err)
    }
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(body);
    }
    catch(err) {
      throw new Error(err)
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.updateUser(id, body);
    }
    catch(err) {
      throw new Error(err)
    }
  }

}
