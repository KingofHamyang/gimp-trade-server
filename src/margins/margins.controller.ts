import { Controller, Get, Query } from '@nestjs/common';
import { DateRangeDto } from './dto/date-range.dto';
import { Margin } from './interfaces/margin.interface'
import { MarginsService } from './margins.service'


@Controller('margins')
export class MarginsController {
  constructor(private marginService: MarginsService) {}

  @Get()
  findByDateRange(@Query() query: DateRangeDto): Margin[] {
    return this.marginService.findByDateRange(query);
  }
}
