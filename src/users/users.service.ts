import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newbie: CreateUserDto) :Promise<User>{
    return this.userRepository.save({
      ...newbie,
      btc_trade_amount: 0
    });
  }
  async findById(id: number) :Promise<any>{
    return this.userRepository
      .findOne({id: id})
  }

  async updateUser(id: number, param: UpdateUserDto) :Promise<User> {
    const user: User = await this.userRepository.findOne({id: id})
    const toUpdate: User = Object.assign(user, param)

    return this.userRepository.save(toUpdate)
  }

  async stateTransition(user: User, btc_trade_amount: number, state: string) :Promise<any> {
    user.btc_trade_amount = btc_trade_amount
    user.state = state
    await this.userRepository.save(user)
  }
}
