import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { DateRangeDto } from './dto/date-range.dto';
import { Gimp } from './gimp.entity'
import { GimpsService } from './gimps.service'


@Controller('api/gimps')
export class GimpsController {
  constructor(private gimpService: GimpsService) {}

  @Get()
  async findByDateRange(@Query() query: DateRangeDto): Promise<Gimp[]> {
    return await this.gimpService.findByDateRange(query);
  }
}
