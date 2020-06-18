import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { DateRangeDto } from './dto/date-range.dto';
import { Margin } from './margin.entity'
import { MarginsService } from './margins.service'


@Controller('api/margins')
export class MarginsController {
  constructor(private marginService: MarginsService) {}

  @Post()
  create(@Body() body: Margin) {
    this.marginService.create(body);
  }

  @Get()
  findByDateRange(@Query() query: DateRangeDto): Promise<Margin[]> {
    return this.marginService.findByDateRange(query);
  }
}
