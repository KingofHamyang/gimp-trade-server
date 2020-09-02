export interface CreateTradeLogInterface {
  datetime: string;
  type: string;
  krw_trade_amount: number;
  krw_trade_fee: number;
  btc_trade_amount: number;
  usd_trade_amount: number;
  usd_trade_fee: number;
}