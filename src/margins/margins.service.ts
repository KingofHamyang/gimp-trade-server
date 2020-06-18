import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';
import { Margin } from './margin.entity';
import { DateRangeDto } from './dto/date-range.dto'

@Injectable()
export class MarginsService {
  constructor(
    @InjectRepository(Margin)
    private marginRepository: Repository<Margin>,
  ) {}

  async findByDateRange(dateRagne: DateRangeDto): Promise<Margin[]> {

    const from: string = moment(dateRagne.from).toISOString();
    const to: string = moment(dateRagne.to).toISOString();

    return await this.marginRepository.createQueryBuilder()
      .select()
      .andWhere(`datetime >= '${from}'`)
      .andWhere(`datetime < '${to}'`)
      .printSql()
      .getMany()
  }
}
