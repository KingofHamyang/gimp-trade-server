import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken'

import { Config } from '../config';

import * as qs from 'qs';
import * as crypto from 'crypto';

const {
  UPBIT_API_KEY,
  UPBIT_API_SECRET,
  UPBIT_API_URL
} = Config

export function upbitTradeLookUp(uuid: string): AxiosPromise<any>{
  const body = {
      uuid: uuid
  }

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

  const options: AxiosRequestConfig = {
      method: "GET",
      url: UPBIT_API_URL + "/order?" + query,
      headers: {Authorization: `Bearer ${token}`},
  }

  return axios(options)
}

export function upbitAccountLookUp(): AxiosPromise<any>{

  const payload = {
      access_key: UPBIT_API_KEY,
      nonce: uuidv4()
  }

  const token = sign(payload, UPBIT_API_SECRET)

  const options :AxiosRequestConfig = {
      method: "GET",
      url: UPBIT_API_URL + "/accounts",
      headers: {Authorization: `Bearer ${token}`},
  }

  return axios(options)
}
