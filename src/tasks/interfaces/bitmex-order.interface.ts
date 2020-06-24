export class BitmexOrderDataInterface {
  symbol: string;
  orderQty: number;
  ordType: string;
}

export class BitmexRequestHeaderInterface {
  'content-type': string;
  'accept': string;
  'api-expires': number;
  'api-key': string;
  'api-signature': string;
}