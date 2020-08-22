import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() body: User) {
    this.userService.create(body);
  }
}
