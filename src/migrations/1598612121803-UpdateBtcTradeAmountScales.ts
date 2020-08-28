import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBtcTradeAmountScales1598612121803 implements MigrationInterface {
    name = 'UpdateBtcTradeAmountScales1598612121803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,5)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,0)`);
    }

}
