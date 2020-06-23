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

  async create(newbie: Margin) :Promise<any>{
    await this.marginRepository
      .createQueryBuilder()
      .insert()
      .into(Margin)
      .values({
        datetime: moment(newbie.datetime).format("YYYY-MM-DD HH:mm:ss").toString(),
        bitmex_price: newbie.bitmex_price,
        upbit_price: newbie.upbit_price,
        rate: newbie.rate
      })
      .execute();
  }

  async findByDateRange(dateRagne: DateRangeDto): Promise<Margin[]> {

    const from: string = moment(dateRagne.from).toISOString();
    const to: string = moment(dateRagne.to).toISOString();

    return await this.marginRepository
      .createQueryBuilder()
      .select()
      .andWhere(`datetime >= '${from}'`)
      .andWhere(`datetime < '${to}'`)
      .printSql()
      .getMany()
  }
}
