import axios from 'axios';
import * as qs from 'qs';
import * as moment from 'moment'

import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { bitmexOrder, upbitOrder } from '../utils/request/order';
import getGimp from '../utils/math/gimp';
import { Config } from '../utils/config';
import { upbitAccountLookUp } from '../utils/request/lookup'

import { UsersService } from '../users/users.service'
import { GimpsService } from '../gimps/gimps.service'
import { User } from '../users/user.entity'
import { Gimp } from '../gimps/gimp.entity'

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
  private isSync = false;
  private readonly logger = new Logger(TasksService.name);

  constructor(private usersService: UsersService, private gimpsService: GimpsService) {}

  async syncData() : Promise<any>{
    const lastIndex: Gimp = await this.gimpsService.findLastUpdatedGimp()
    const lastUpdatedDatetime = lastIndex ? moment(lastIndex.datetime) : moment().subtract(20, 'minutes').utc();
    const lastCheckTime = lastUpdatedDatetime.add(1, 'minutes').seconds(0).milliseconds(0)

    while(true) {
      const currentTime = moment()
        .seconds(0)
        .milliseconds(0)
        .utc()
      if (lastCheckTime >= currentTime) break;

      const searchStartPoint = moment(lastCheckTime);
      lastCheckTime.add(199, 'minutes');

      const bitmexRequest = await axios
        .get(
          `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1m&symbol=XBT&reverse=true&endTime=${lastCheckTime}&count=200`,
        )
      const upbitRequest = await axios
        .get(
          `https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=200&to=${lastCheckTime
            .add(1, 'minutes')
            .format('YYYY-MM-DD HH:mm:ss')}`,
        )

      const bitmexData = bitmexRequest.data.reverse();
      const upbitData = upbitRequest.data.reverse();

      let bitmexIterator = 0
      let upbitIteratior = 0

      for (let i = 0 ; i < 200 && searchStartPoint < currentTime; i++ ){
        let bitmex_price;
        let upbit_price;

        for (;bitmexIterator < bitmexData.length && searchStartPoint >= moment(bitmexData[bitmexIterator].timestamp); bitmexIterator++){
          if (searchStartPoint.diff(moment(bitmexData[bitmexIterator].timestamp)) === 0)
            bitmex_price = bitmexData[bitmexIterator].close;
        }

        for (;upbitIteratior < upbitData.length && searchStartPoint >= moment(upbitData[upbitIteratior].candle_date_time_kst); upbitIteratior++){
          if (searchStartPoint.diff(moment(upbitData[upbitIteratior].candle_date_time_kst)) === 0)
            upbit_price = upbitData[upbitIteratior].trade_price;
        }

        const gimp =
        bitmex_price && upbit_price
          ? getGimp(upbit_price, Number(1150), bitmex_price)
          : null;

        this.gimpsService.create({
          datetime: searchStartPoint.toDate(),
          upbit_price,
          bitmex_price,
          gimp,
          fixed_gimp: 0,
          usdkrw_rate: 0
        })
        searchStartPoint.add(1, 'm');
      }
    }
  }

  @Interval(1000)
  async test(): Promise<any>{
    try {
      if (this.isSync === false) {
        this.isSync = true
        // critical section start
        console.log("empty, start to sync")
        await this.syncData();
        // critical section end
        this.isSync=false
      } else {
        console.log("state is full, wait for time")
      }
    } catch (err){
      console.log(err)
      this.isSync=false
    }
  }

  // @Interval(1000)
  // gimpTrade(): any {
  //   const bitmexPriceUrl = BITMEX_API_URL + '/trade?' + qs.stringify({
  //     symbol: 'XBT',
  //     reverse: true,
  //     count: 1
  //   })

  //   const upbitPriceUrl = UPBIT_API_URL + '/ticker?' + qs.stringify({
  //     markets: 'KRW-BTC'
  //   })

  //   const rateUrl = FREEFORE_API_URL + '/live?' + qs.stringify({
  //     pairs: 'USDKRW'
  //   })

  //   const requests = [axios.get(bitmexPriceUrl), axios.get(upbitPriceUrl), axios.get(rateUrl), upbitAccountLookUp() ];

  //   Promise.all(requests)
  //     .then(async ([btcUsd, btcKrw, usdKrw, userAcountKrw]) => {
  //       const btcUsdPrice = btcUsd.data[0].price
  //       const btcKrwPrice = btcKrw.data[0].trade_price
  //       const usdKrwRate = usdKrw.data.rates.USDKRW.rate.toFixed(1)
  //       // 고정김프
  //       const currentGimp = getGimp(btcKrwPrice, Number(FIXED_USDKRW), btcUsdPrice);

  //       const user: User = await this.usersService.findById(1);
  //       const tradeState: string = user.state

  //       // console.log('BUT TARGET GIMP = ', Number(BUY_TARGET_GIMP))
  //       // console.log('SELL TARGET GIMP = ', Number(SELL_TARGET_GIMP))
  //       console.log('BTC KRW = ', btcKrwPrice)
  //       console.log('BTC USD Price = ', btcUsdPrice)
  //       console.log('CURRENT GIMP = ', currentGimp)
  //       // console.log('USD KRW RATE = ', usdKrwRate)
  //       // console.log('유저 게정상태')
  //       // console.log(userAcountKrw.data)

  //       if (tradeState === 'BUY' && Number(BUY_TARGET_GIMP) >= currentGimp) {


  //         // TODO: Get TRADE_AMOUNT_KRW from user or .env
  //         const krwTradeAmount: number = userAcountKrw.data.find(o => o.currency === "KRW").balance
  //         const btcTradeAmount: number = krwTradeAmount / btcKrwPrice;
  //         const usdTradeAmount: number = Math.ceil(btcTradeAmount * btcUsdPrice);

  //         // const trade_currency = [
  //         //   upbitOrder({
  //         //     market: 'KRW-BTC',
  //         //     side: 'bid',
  //         //     price: krwTradeAmount,
  //         //     ord_type: 'price',
  //         //   }),
  //         //   bitmexOrder('POST', 'order', {
  //         //     symbol: 'XBTUSD',
  //         //     orderQty: -usdTradeAmount,
  //         //     ordType: 'Market',
  //         //   })
  //         // ]

  //         // Promise.all(trade_currency)
  //         //   .then(()=>{
  //         //     user.btc_trade_amount = btcTradeAmount
  //         //     user.state = 'SELL';
  //         //     this.usersService.updateUser(user)
  //         //   })
  //         //   .catch((err)=>{
  //         //     throw new Error(err)
  //         //   })
  //       } else if (tradeState === 'SELL' && Number(SELL_TARGET_GIMP) <= currentGimp) {

  //         const btcTradeAmount: number = user.btc_trade_amount
  //         const usdTradeAmount: number = Math.ceil(btcTradeAmount * btcUsdPrice);

  //         // const trade_currency = [
  //         //   upbitOrder({
  //         //     market: 'KRW-BTC',
  //         //     side: 'ask',
  //         //     volume: btcTradeAmount,
  //         //     ord_type: 'market',
  //         //   }),
  //         //   bitmexOrder('POST', 'order', {
  //         //     symbol: 'XBTUSD',
  //         //     orderQty: usdTradeAmount,
  //         //     ordType: 'Market',
  //         //   })
  //         // ]

  //         // Promise.all(trade_currency)
  //         //   .then(()=>{
  //         //     user.state = 'BUY';
  //         //     user.btc_trade_amount = 0;
  //         //     this.usersService.updateUser(user)
  //         //   })
  //         //   .catch((err)=>{
  //         //     throw new Error(err)
  //         //   })
  //       }
  //     })
  //   .catch(e => {
  //       console.log(e)
  //       throw new Error(e);
  //   });
  // }
}
