import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newbie: User) :Promise<any>{
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(newbie)
      .execute();
  }
  async findById(id: number) :Promise<any>{
    return await this.userRepository
      .findOne({id: id})
  }

  async updateUser(updateUser: User) :Promise<any>{
    await this.userRepository
    .save(updateUser)
  }
}
