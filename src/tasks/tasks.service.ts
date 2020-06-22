import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    // this.logger.debug('Called when the second is 45');
  }

  @Interval(1000)
  handleInterval() {
    // this.logger.debug('Called every 10 seconds');
  }

  @Interval(1000)
  graphDataSync() {
    // graph gimp-rate PSQL에 업데이트
  }

  @Interval(1000)
  tradeRequest() {
    // 주기 마다 rate 확인 후 시점이라고 판단되면 거래 요청
  }
}