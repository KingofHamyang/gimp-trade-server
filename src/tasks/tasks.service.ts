import axios from 'axios';
import qs from 'qs';
import * as crypto from 'crypto';

import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import {
  BITMEX_API_KEY,
  BITMEX_API_SECRET,
  BUY_TARGET_GIMP,
  SELL_TARGET_GIMP,
  TRADE_AMOUNT_KRW,
  FIXED_USDKRW,
} from '../utils/config';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    // this.logger.debug('Called when the second is 45');
  }

  @Interval(1000)
  handleInterval() {
    // this.logger.debug('Called every 10 seconds');
  }

  @Interval(1000)
  graphDataSync() {
    // graph gimp-rate PSQL에 업데이트
  }

  bitmexOrder(method: any, endpoint: string, data: object) {
    const apiKey = BITMEX_API_KEY;
    const apiSecret = BITMEX_API_SECRET;

    const apiRoot: string = '/api/v1/';
    const expires: number = Math.round(new Date().getTime() / 1000) + 60;

    let query: string = '',
      postBody: string = '';
    if (method === 'GET') query = '?' + qs.stringify(data);
    else postBody = JSON.stringify(data);

    const signature: string = crypto
      .createHmac('sha256', apiSecret)
      .update(method + apiRoot + endpoint + query + expires + postBody)
      .digest('hex');

    const headers: object = {
      'content-type': 'application/json',
      accept: 'application/json',
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': signature,
    };
    const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;

    const requestOptions = {
      method,
      headers,
      data: postBody,
      url,
    };
    console.log(requestOptions);
    return axios(requestOptions)
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          // console.log(
          //   `${response.data.transactionTime} : ${response.data.cumQty}`,
          // );
          // console.log(response.data.avgPx);
        }
        return response;
      })
      .catch(e => {
        throw Error;
      });
  }

  @Interval(10000)
  // TODO : buyTargetGimp, sellTargetGimp 를 사용자객체에 따로 저장해놔야될듯(DB에)? 이렇게 parameter로 받아도 되는건가??
  // TODO : parameter를 언제 어떻게 채워줄 수 있는거임?? 일단 초기화를 하긴했는데 언제 parameter를 채워줘야되는지 잘 모르겠음
  gimpTrade() {
    const bitmexPrice = axios
      .get(
        'https://www.bitmex.com/api/v1/trade?symbol=XBT&reverse=true&count=1',
      )
      .then(response => response.data[0].price)
      .catch(error => console.log(error));

    // TODO : Change this api url to the official
    const upbitPrice = axios
      .get(
        'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1',
      )
      .then(response => response.data[0].tradePrice)
      .catch(error => console.log(error));

    const rate = axios
      .get('https://www.freeforexapi.com/api/live?pairs=USDKRW')
      .then(response => response.data.rates.USDKRW.rate.toFixed(1))
      .catch(error => console.log(error));

    Promise.all([bitmexPrice, upbitPrice, rate]).then(
      ([BTCUSD, BTCKRW, USDKRW]) => {
        // console.log(BTCUSD, BTCKRW, USDKRW);

        // 고정김프
        const fixedGimp: number = Number(
          (((BTCKRW - Number(FIXED_USDKRW) * BTCUSD) * 100) / BTCKRW).toFixed(
            3,
          ),
        );

        // 변동김프
        const flexibleGimp: number = Number(
          (((BTCKRW - USDKRW * BTCUSD) * 100) / BTCKRW).toFixed(3),
        );

        const BTCAmount: number = Number(TRADE_AMOUNT_KRW) / BTCKRW;
        const orderQty: number = Math.ceil(BTCAmount * BTCUSD);
        console.log('BTCAmount : ', BTCAmount);
        console.log('TRADE_AMOUNT_KRW : ', TRADE_AMOUNT_KRW);
        console.log('orderQty : ', orderQty);

        // TODO : Add tradeState to DB. 'BUY', 'SELL' and 'SLEEPING state
        let tradeState = 'BUY';
        console.log('tradeState : ', tradeState);
        console.log('fixedGimp : ', fixedGimp);
        console.log(
          'TARGET_GIMP : ',
          tradeState === 'BUY' ? BUY_TARGET_GIMP : SELL_TARGET_GIMP,
        );
        if (tradeState === 'BUY' && Number(BUY_TARGET_GIMP) >= fixedGimp) {
          // buy upbit

          // sell bitmex
          this.bitmexOrder('POST', 'order', {
            symbol: 'XBTUSD',
            orderQty: -orderQty,
            ordType: 'Market',
          });
          // Change tradeStatev from 'BUY' to 'SELL'
          tradeState = 'SELL';
        } else if (
          tradeState === 'SELL' &&
          Number(SELL_TARGET_GIMP) <= fixedGimp
        ) {
          // sell upbit

          // buy bitmex
          this.bitmexOrder('POST', 'order', {
            symbol: 'XBTUSD',
            orderQty: orderQty,
            ordType: 'Market',
          });
          // Change tradeState from 'SELL' to 'SLEEPING'
          tradeState = 'SLEEPING';
        }
      },
    );
  }
}
