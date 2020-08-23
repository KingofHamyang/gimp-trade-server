import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { DateRangeDto } from './dto/date-range.dto';
import { Gimp } from './gimp.entity'
import { GimpsService } from './gimps.service'


@Controller('api/gimps')
export class GimpsController {
  constructor(private gimpService: GimpsService) {}

  @Post()
  create(@Body() body: Gimp) {
    return this.gimpService.create(body);
  }

  @Get()
  findByDateRange(@Query() query: DateRangeDto): Promise<Gimp[]> {
    return this.gimpService.findByDateRange(query);
  }
}
