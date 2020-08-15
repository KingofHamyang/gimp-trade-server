import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBtcTradeAmountToUser1597403011888 implements MigrationInterface {
    name = 'AddBtcTradeAmountToUser1597403011888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "btc_trade_amount" numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "stake" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "stake" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "btc_trade_amount"`);
    }

}
