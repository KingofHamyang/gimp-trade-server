import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeBtcTradeAmountColumn1598632239023 implements MigrationInterface {
    name = 'ChangeBtcTradeAmountColumn1598632239023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "btc_trade_amount" TYPE numeric(9,0)`);
    }

}
