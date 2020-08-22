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
    // await this.gimpRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Gimp)
    //   .values({
    //     datetime: moment(newbie.datetime).format("YYYY-MM-DD HH:mm:ss").toString(),
    //     bitmex_price: newbie.bitmex_price,
    //     upbit_price: newbie.upbit_price,
    //     rate: newbie.rate
    //   })
    //   .execute();
  }

  async findByDateRange(dateRagne: DateRangeDto): Promise<Gimp[]> {

    const from: string = moment(dateRagne.from).toISOString();
    const to: string = moment(dateRagne.to).toISOString();

    return await this.gimpRepository
      .createQueryBuilder()
      .select()
      .andWhere(`datetime >= '${from}'`)
      .andWhere(`datetime < '${to}'`)
      .printSql()
      .getMany()
  }
}
