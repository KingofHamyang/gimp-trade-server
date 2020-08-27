export class CreateUserDto {
  buy_target_gimp: number;
  sell_target_gimp: number;
  krw_trade_amount: number;
  state: TradingState
}

enum TradingState {
  SLEEP = 'SLEEP',
  BUY = 'BUY',
  SELL = 'SELL'
}