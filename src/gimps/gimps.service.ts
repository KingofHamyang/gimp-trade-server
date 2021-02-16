import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';
import { Gimp } from './gimp.entity';
import { DateRangeDto } from './dto/date-range.dto'

@Injectable()
export class GimpsService {
  constructor(
    @InjectRepository(Gimp)
    private gimpRepository: Repository<Gimp>,
  ) {}

  async create(newbie: Gimp) :Promise<any>{
    try {
    await this.gimpRepository
      .createQueryBuilder()
      .insert()
      .into(Gimp)
      .values({
        datetime: moment(newbie.datetime).toISOString(),
        bitmex_price: newbie.bitmex_price,
        upbit_price: newbie.upbit_price,
        gimp: newbie.gimp,
        fixed_gimp: newbie.fixed_gimp,
        usdkrw_rate: newbie.usdkrw_rate
      })
      .execute();
    }catch(err){
      console.log(err)
    }
  }

  async findLastUpdatedGimp(): Promise<Gimp> {
    return await this.gimpRepository
      .createQueryBuilder()
      .select()
      .orderBy('datetime', 'DESC')
      .getOne()
  }

  async findByDateRange(dateRagne: DateRangeDto): Promise<Gimp[]> {
    
    const from = dateRagne.from ? moment(dateRagne.from) : undefined;
    const to = moment(dateRagne.to);

    if (from) {
      return this.gimpRepository
      .createQueryBuilder()
      .select()
      .where(`datetime <= '${to.toISOString()}'`)
      .andWhere(`datetime >= '${from.toISOString()}'`)
      .orderBy('datetime', 'DESC')
      .getMany()
    }
    else {
      return this.gimpRepository
      .createQueryBuilder()
      .select()
      .where(`datetime <= '${to.toISOString()}'`)
      .orderBy('datetime', 'DESC')
      .limit(1)
      .getMany()
    }
  }
}
