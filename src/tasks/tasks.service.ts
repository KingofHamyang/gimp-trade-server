import axios from 'axios';
import * as qs from 'qs';

import bitmexOrder from '../utils/order/order';
import getGimp from '../utils/math/gimp';

import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { Config } from '../utils/config';

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

  @Interval(1000)
  gimpTrade(): any {
    const bitmexPriceUrl = BITMEX_API_URL + '/trade?' + qs.stringify({
      symbol: 'XBT',
      reverse: true,
      count: 1
    })

    const upbitPriceUrl = UPBIT_API_URL + '/crix/candles/minutes/1?' + qs.stringify({
      code: 'CRIX.UPBIT.KRW-BTC',
      count: 1
    })

    const rateUrl = FREEFORE_API_URL + '/live?' + qs.stringify({
      pairs: 'USDKRW'
    })

    const requests = [axios.get(bitmexPriceUrl), axios.get(upbitPriceUrl), axios.get(rateUrl)];

    Promise.all(requests)
      .then(([btcUsd, btcKrw, usdKrw]) => {
        const btcUsdPrice = btcUsd.data[0].price
        const btcKrwPrice = btcKrw.data[0].tradePrice
        const usdKrwRate = usdKrw.data.rates.USDKRW.rate.toFixed(1)
        // 고정김프
        const fixedGimp = getGimp(btcKrwPrice, Number(FIXED_USDKRW), btcUsdPrice);

        // 변동김프
        const flexibleGimp = getGimp(btcKrwPrice, usdKrwRate, btcUsdPrice);

        const tradeAmountKrw = Number(TRADE_AMOUNT_KRW);
        const btcAmount: number = tradeAmountKrw / btcKrwPrice;
        const tradeAmountUsd: number = Math.ceil(btcAmount * btcUsdPrice);

        console.log('btcAmount : ', btcAmount);
        console.log('tradeAmountKrw : ', tradeAmountKrw);
        console.log('tradeAmountUsd : ', tradeAmountUsd);

        // TODO : Add tradeState to DB. 'BUY', 'SELL' and 'SLEEPING state
        let tradeState = 'BUY';
        console.log('tradeState : ', tradeState);
        console.log('fixedGimp : ', fixedGimp);
        console.log(
          'TARGET_GIMP : ',
          tradeState === 'BUY' ? BUY_TARGET_GIMP : SELL_TARGET_GIMP,
        );
        if (tradeState === 'BUY' && Number(BUY_TARGET_GIMP) >= fixedGimp) {
          // TODO: buy upbit

          // sell bitmex
          bitmexOrder('POST', 'order', {
            symbol: 'XBTUSD',
            orderQty: -tradeAmountUsd,
            ordType: 'Market',
          });

          // Change tradeStatev from 'BUY' to 'SELL'
          tradeState = 'SELL';
        } else if (tradeState === 'SELL' && Number(SELL_TARGET_GIMP) <= fixedGimp) {
          // TODO: sell upbit

          // buy bitmex
          bitmexOrder('POST', 'order', {
            symbol: 'XBTUSD',
            orderQty: tradeAmountUsd,
            ordType: 'Market',
          });

          // Change tradeState from 'SELL' to 'SLEEPING'
          tradeState = 'SLEEPING';
        }
      })
    .catch(e => {
        throw new Error(e);
    });
  }
}
