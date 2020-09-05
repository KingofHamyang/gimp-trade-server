import { Controller, Get, Post } from '@nestjs/common';
import { TradeLogsService } from './trade-logs.service';
@Controller('api/trade-logs')
export class TradeLogsController {
  constructor(private tradeLogsService: TradeLogsService) {}

  @Get('/all')
  async show(): Promise<any> {
    try {
      return await this.tradeLogsService.findTradeLogs()
    } catch (err) {
      throw new Error(err)
    }
  }
}
