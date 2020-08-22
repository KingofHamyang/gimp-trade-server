import axios from 'axios';
import * as qs from 'qs';

import { bitmexOrder, upbitOrder } from '../utils/order/order';
import getGimp from '../utils/math/gimp';

import { UsersService } from '../users/users.services'
import { User } from '../users/user.entity'

import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { Config } from '../utils/config';

import { upbitAccountLookUp } from '../utils/order/lookup'

const {
  FIXED_USDKRW,
  TRADE_AMOUNT_KRW,
  BUY_TARGET_GIMP,
  SELL_TARGET_GIMP,
  BITMEX_API_URL,
  UPBIT_API_URL,
  FREEFORE_API_URL,
} = Config;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private usersService: UsersService) {}

  @Interval(1000)
  gimpTrade(): any {
    const bitmexPriceUrl = BITMEX_API_URL + '/trade?' + qs.stringify({
      symbol: 'XBT',
      reverse: true,
      count: 1
    })

    const upbitPriceUrl = UPBIT_API_URL + '/ticker?' + qs.stringify({
      markets: 'KRW-BTC'
    })

    const rateUrl = FREEFORE_API_URL + '/live?' + qs.stringify({
      pairs: 'USDKRW'
    })

    const requests = [axios.get(bitmexPriceUrl), axios.get(upbitPriceUrl), axios.get(rateUrl), upbitAccountLookUp() ];

    Promise.all(requests)
      .then(async ([btcUsd, btcKrw, usdKrw, userAcountKrw]) => {
        const btcUsdPrice = btcUsd.data[0].price
        const btcKrwPrice = btcKrw.data[0].trade_price
        const usdKrwRate = usdKrw.data.rates.USDKRW.rate.toFixed(1)
        // 고정김프
        const currentGimp = getGimp(btcKrwPrice, Number(FIXED_USDKRW), btcUsdPrice);

        const user: User = await this.usersService.findById(1);
        const tradeState: string = user.state

        // console.log('BUT TARGET GIMP = ', Number(BUY_TARGET_GIMP))
        // console.log('SELL TARGET GIMP = ', Number(SELL_TARGET_GIMP))
        console.log('BTC KRW = ', btcKrwPrice)
        console.log('BTC USD Price = ', btcUsdPrice)
        console.log('CURRENT GIMP = ', currentGimp)
        // console.log('USD KRW RATE = ', usdKrwRate)
        // console.log('유저 게정상태')
        // console.log(userAcountKrw.data)

        if (tradeState === 'BUY' && Number(BUY_TARGET_GIMP) >= currentGimp) {


          // TODO: Get TRADE_AMOUNT_KRW from user or .env
          const krwTradeAmount: number = userAcountKrw.data.find(o => o.currency === "KRW").balance
          const btcTradeAmount: number = krwTradeAmount / btcKrwPrice;
          const usdTradeAmount: number = Math.ceil(btcTradeAmount * btcUsdPrice);

          // const trade_currency = [
          //   upbitOrder({
          //     market: 'KRW-BTC',
          //     side: 'bid',
          //     price: krwTradeAmount,
          //     ord_type: 'price',
          //   }),
          //   bitmexOrder('POST', 'order', {
          //     symbol: 'XBTUSD',
          //     orderQty: -usdTradeAmount,
          //     ordType: 'Market',
          //   })
          // ]

          // Promise.all(trade_currency)
          //   .then(()=>{
          //     user.btc_trade_amount = btcTradeAmount
          //     user.state = 'SELL';
          //     this.usersService.updateUser(user)
          //   })
          //   .catch((err)=>{
          //     throw new Error(err)
          //   })          
        } else if (tradeState === 'SELL' && Number(SELL_TARGET_GIMP) <= currentGimp) {

          const btcTradeAmount: number = user.btc_trade_amount
          const usdTradeAmount: number = Math.ceil(btcTradeAmount * btcUsdPrice);

          // const trade_currency = [
          //   upbitOrder({
          //     market: 'KRW-BTC',
          //     side: 'ask',
          //     volume: btcTradeAmount,
          //     ord_type: 'market',
          //   }),
          //   bitmexOrder('POST', 'order', {
          //     symbol: 'XBTUSD',
          //     orderQty: usdTradeAmount,
          //     ordType: 'Market',
          //   })
          // ]

          // Promise.all(trade_currency)
          //   .then(()=>{
          //     user.state = 'BUY';
          //     user.btc_trade_amount = 0;
          //     this.usersService.updateUser(user)
          //   })
          //   .catch((err)=>{
          //     throw new Error(err)
          //   })   
        }
      })
    .catch(e => {
        console.log(e)
        throw new Error(e);
    });
  }
}
