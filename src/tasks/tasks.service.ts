import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }
}