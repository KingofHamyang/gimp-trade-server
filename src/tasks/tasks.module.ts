import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service'
import { GimpsService } from '../gimps/gimps.service'

import { User } from '../users/user.entity'
import { Gimp } from '../gimps/gimp.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Gimp])],
  providers: [TasksService, UsersService, GimpsService],
})
export class TasksModule {}