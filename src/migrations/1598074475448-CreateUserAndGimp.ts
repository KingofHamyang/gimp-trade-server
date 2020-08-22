import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAndGimp1598074475448 implements MigrationInterface {
    name = 'CreateUserAndGimp1598074475448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gimp" ("datetime" TIMESTAMP NOT NULL, "upbit_price" numeric(9,0) NOT NULL, "bitmex_price" numeric(7,1) NOT NULL, "fixed_gimp" numeric(6,3) NOT NULL, "gimp" numeric(6,3) NOT NULL, "usdkrw_rate" numeric(6,3) NOT NULL, CONSTRAINT "PK_9a0bf26e81a50069230a74c9755" PRIMARY KEY ("datetime"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "but_target_gimp" numeric(9,0), "sell_target_gimp" numeric(9,0), "btc_trade_amount" numeric(9,0), "state" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "gimp"`);
    }

}
