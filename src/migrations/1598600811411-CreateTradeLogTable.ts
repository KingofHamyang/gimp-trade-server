import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTradeLogTable1598600811411 implements MigrationInterface {
    name = 'CreateTradeLogTable1598600811411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trade_log" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "type" integer NOT NULL, "krw_trade_amount" numeric(9,0), "btc_trade_amount" numeric(9,0), "usd_trade_amount" numeric(7,1), CONSTRAINT "PK_61673a8a3e15ce6c5c536106f15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gimp" DROP CONSTRAINT "PK_9a0bf26e81a50069230a74c9755"`);
        await queryRunner.query(`ALTER TABLE "gimp" DROP COLUMN "datetime"`);
        await queryRunner.query(`ALTER TABLE "gimp" ADD "datetime" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gimp" ADD CONSTRAINT "PK_9a0bf26e81a50069230a74c9755" PRIMARY KEY ("datetime")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gimp" DROP CONSTRAINT "PK_9a0bf26e81a50069230a74c9755"`);
        await queryRunner.query(`ALTER TABLE "gimp" DROP COLUMN "datetime"`);
        await queryRunner.query(`ALTER TABLE "gimp" ADD "datetime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gimp" ADD CONSTRAINT "PK_9a0bf26e81a50069230a74c9755" PRIMARY KEY ("datetime")`);
        await queryRunner.query(`DROP TABLE "trade_log"`);
    }

}
