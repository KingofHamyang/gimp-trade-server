import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() body: User): Promise<User> {
    await this.userService.create(body);
    return body
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() body: User) {
  //   await this.userService.updateUser(body)
  //   return 
  // }

}
