import { Injectable } from '@nestjs/common';
import { Margin } from './interfaces/margin.interface'
import { DateRangeDto } from './dto/date-range.dto'

@Injectable()
export class MarginsService {
  private readonly margins: Margin[] = [];

  findByDateRange(date_ragne: any): Margin[] {
    return this.margins;
  }
}
