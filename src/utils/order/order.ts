import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import * as crypto from 'crypto';

import { Config } from '../config';
const {
  BITMEX_API_KEY,
  BITMEX_API_SECRET,
} = Config

import { BitmexOrderDataInterface, BitmexRequestHeaderInterface } from '../../tasks/interfaces/bitmex-order.interface';


export default function bitmexOrder(method: Method, endpoint: string, data: BitmexOrderDataInterface): any {
  const apiKey = BITMEX_API_KEY;
  const apiSecret = BITMEX_API_SECRET;

  const apiRoot = '/api/v1/';
  const expires: number = Math.round(new Date().getTime() / 1000) + 60;

  let query = '',
    postBody = '';
  if (method === 'GET') query = '?' + qs.stringify(data);
  else postBody = JSON.stringify(data);

  const signature: string = crypto
    .createHmac('sha256', apiSecret)
    .update(method + apiRoot + endpoint + query + expires + postBody)
    .digest('hex');

  const headers: BitmexRequestHeaderInterface = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature,
  };
  const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;

  const requestOptions: AxiosRequestConfig = {
    method,
    headers,
    data: postBody,
    url,
  };

  return axios(requestOptions)
    .then(response => {
      if (response.status === 200) {
        console.log('-------------SUCCESS ORDER---------------');
        console.log(
          `${response.data.timestamp} : ${response.data.side} ${response.data.cumQty}$ at ${response.data.avgPx}$ in BITMEX`,
        );
      }
      return response;
    })
    .catch(e => {
      throw new Error(e);
    });
}