import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsdTradeAmountScale1598617306197 implements MigrationInterface {
    name = 'UpdateUsdTradeAmountScale1598617306197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "usd_trade_amount" TYPE numeric(9,0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" ALTER COLUMN "usd_trade_amount" TYPE numeric(7,1)`);
    }

}
