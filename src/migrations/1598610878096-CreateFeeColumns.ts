import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFeeColumns1598610878096 implements MigrationInterface {
    name = 'CreateFeeColumns1598610878096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" ADD "krw_trade_fee" numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "trade_log" ADD "usd_trade_fee" numeric(7,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" DROP COLUMN "usd_trade_fee"`);
        await queryRunner.query(`ALTER TABLE "trade_log" DROP COLUMN "krw_trade_fee"`);
    }

}
