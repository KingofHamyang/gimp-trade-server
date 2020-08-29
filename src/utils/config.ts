import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

export const Config = process.env;
Config.SELL = "SELL";
Config.BUY = "BUY";

// export const DB_TPYE = process.env.DB_TPYE;
// export const DB_HOST = process.env.DB_HOST;
// export const DB_PORT = process.env.DB_PORT;
// export const DB_USERNAME = process.env.DB_USERNAME;
// export const DB_PASSWORD = process.env.DB_PASSWORD;
// export const DB_DATABASE = process.env.DB_DATABASE;

// export const BITMEX_API_URL = process.env.BITMEX_API_URL;
// export const BITMEX_API_KEY = process.env.BITMEX_API_KEY;
// export const BITMEX_API_SECRET = process.env.BITMEX_API_SECRET;

// export const UPBIT_API_URL = process.env.UPBIT_API_URL;
// export const FREEFORE_API_URL = process.env.FREEFORE_API_URL;

// export const FIXED_USDKRW = process.env.FIXED_USDKRW;

// export const BUY_TARGET_GIMP = process.env.BUY_TARGET_GIMP;
// export const SELL_TARGET_GIMP = process.env.SELL_TARGET_GIMP;
// export const TRADE_AMOUNT_KRW = process.env.TRADE_AMOUNT_KRW;

