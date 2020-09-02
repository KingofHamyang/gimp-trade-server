import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTradeLogTable1598632137547 implements MigrationInterface {
    name = 'CreateTradeLogTable1598632137547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trade_log" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL, "krw_trade_amount" numeric(9,0), "krw_trade_fee" numeric(9,0), "btc_trade_amount" numeric(9,5), "usd_trade_amount" numeric(9,0), "usd_trade_fee" numeric(7,3), CONSTRAINT "PK_61673a8a3e15ce6c5c536106f15" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trade_log"`);
    }

}
