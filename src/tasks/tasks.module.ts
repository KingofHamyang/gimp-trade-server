import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service'
import { GimpsService } from '../gimps/gimps.service'
import { TradeLogsService } from '../trade-logs/trade-logs.service'

import { User } from '../users/user.entity'
import { Gimp } from '../gimps/gimp.entity'
import { TradeLog } from '../trade-logs/trade-log.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Gimp, TradeLog])],
  providers: [TasksService, UsersService, GimpsService, TradeLogsService],
})
export class TasksModule {}