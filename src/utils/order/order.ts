import axios, { AxiosRequestConfig, Method } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken'
import * as qs from 'qs';
import * as crypto from 'crypto';

import { Config } from '../config';
const {
  BITMEX_API_ID,
  BITMEX_API_SECRET,
  UPBIT_API_KEY,
  UPBIT_API_SECRET,
  UPBIT_API_URL
} = Config

import { BitmexOrderDataInterface, BitmexRequestHeaderInterface } from '../../tasks/interfaces/bitmex-order.interface';

export function upbitOrder(body: any){

  const query = qs.stringify(body)

  const hash = crypto.createHash('sha512')
  const queryHash = hash.update(query, 'utf8').digest('hex')

  const payload = {
      access_key: UPBIT_API_KEY,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
  }

  const token = sign(payload, UPBIT_API_SECRET)

  const options :AxiosRequestConfig = {
      method: "POST",
      url: UPBIT_API_URL + "/orders",
      headers: {Authorization: `Bearer ${token}`},
      data: body
  }

  return axios(options)
}

export function bitmexOrder(method: Method, endpoint: string, data: BitmexOrderDataInterface): any {
  const apiKey = BITMEX_API_ID;
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
}