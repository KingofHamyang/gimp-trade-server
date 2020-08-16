import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.services'

import { User } from '../users/user.entity' 

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TasksService, UsersService],
})
export class TasksModule {}