import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTable1598198289395 implements MigrationInterface {
    name = 'UpdateUserTable1598198289395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "krw_trade_amount" numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "buy_target_gimp" TYPE numeric(6,3)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sell_target_gimp" TYPE numeric(6,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sell_target_gimp" TYPE numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "buy_target_gimp" TYPE numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "krw_trade_amount"`);
    }

}
