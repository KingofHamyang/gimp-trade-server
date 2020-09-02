import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePrecisionUserAndTradeLog1599025520092 implements MigrationInterface {
    name = 'ChangePrecisionUserAndTradeLog1599025520092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "btc_trade_amount" TYPE numeric(12,10)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(12,10)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,5)`);
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,5)`);
    }

}
