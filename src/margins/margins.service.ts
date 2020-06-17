import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { Margin } from './margin.entity';
import { DateRangeDto } from './dto/date-range.dto'

@Injectable()
export class MarginsService {
  constructor(
    @InjectRepository(Margin)
    private marginRepository: Repository<Margin>,
  ) {}

  async findByDateRange(date_ragne: any): Promise<Margin[]> {
    return await this.marginRepository.find({
      datetime: Between(Date.now(), Date.now())
    })
  }
}
