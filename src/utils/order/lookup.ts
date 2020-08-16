import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken'

import { Config } from '../config';

const {
  UPBIT_API_KEY,
  UPBIT_API_SECRET,
  UPBIT_API_URL
} = Config

export function upbitAccountLookUp(){

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
