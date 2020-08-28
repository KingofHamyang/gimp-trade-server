import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypeColumn1598607146735 implements MigrationInterface {
    name = 'ChangeTypeColumn1598607146735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "trade_log" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_log" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "trade_log" ADD "type" integer NOT NULL`);
    }

}
