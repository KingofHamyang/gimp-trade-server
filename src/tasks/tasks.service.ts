import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import axios from 'axios';
import qs from 'qs';
import crypto from 'crypto';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Interval(1000)
  graphDataSync() {
    // graph gimp-rate PSQL에 업데이트
  }

  makeRequest(method: string, endpoint: string, data: object) {
    const apiKey = 'dpRWa_ByME44aT5MkEJJU4tJ';
    const apiSecret = 'dOuLw6Q54RCbcQOjiaHakjo7DjvgEIwz7SGhvDmdm2wDx6P7';

    const apiRoot: string = '/api/v1/';
    const expires: number = Math.round(new Date().getTime() / 1000) + 60;

    let query: string = '',
      postBody: string = '';
    if (method === 'GET') query = '?' + qs.stringify(data);
    else postBody = JSON.stringify(data);

    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(method + apiRoot + endpoint + query + expires + postBody)
      .digest('hex');

    const headers = {
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
    };
    //if (method !== 'GET') requestOptions.data = postBody;
    // console.log(requestOptions);
    return axios
      .post(url, requestOptions)
      .then(response => response)
      .catch(e => {
        throw Error;
      });
  }

  @Interval(1000)
  //TODO : buyTargetGimp, sellTargetGimp 를 사용자객체에 따로 저장해놔야될듯(DB에)? 이렇게 parameter로 받아도 되는건가??
  tradeRequest(buyTargetGimp: Number, sellTargetGimp: Number) {
    const bitmexPrice = axios
      .get(
        'https://www.bitmex.com/api/v1/trade?symbol=XBT&reverse=true&count=1',
      )
      .then(response => response.data[0].price)
      .catch(error => console.log(error));

    // Change this api url to the official
    // TODO 성준
    const upbitPrice = axios
      .get(
        'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1',
      )
      .then(response => response.data[1].price)
      .catch(error => console.log(error));

    const rate = axios
      .get('https://www.freeforexapi.com/api/live?pairs=USDKRW')
      .then(response => response.data.rates.USDKRW.rate.toFixed(1))
      .catch(error => console.log(error));

    Promise.all([bitmexPrice, upbitPrice, rate]).then(
      ([BTCUSD, BTCKRW, USDKRW]) => {
        // console.log(BTCUSD, BTCKRW, USDKRW);

        // 고정 마진
        const fixedMargin = Number(
          (((BTCKRW - 1150 * BTCUSD) * 100) / BTCKRW).toFixed(3),
        );

        //TODO USDKRW number빼기
        // 변동마진
        const flexibleMargin = Number(
          (((BTCKRW - USDKRW * BTCUSD) * 100) / BTCKRW).toFixed(3),
        );
        this.makeRequest('POST', 'order', {
          symbol: 'XBTUSD',
          orderQty: 1,
          price: 590,
          ordType: 'Limit',
        });
        if (sellTargetGimp <= fixedMargin) {
          // sell upbit <-
          // sell bitmex X1
        } else if (buyTargetGimp >= fixedMargin) {
          // buy upbit
          // sell bitmex X2
        }
      },
    );
  }
}
