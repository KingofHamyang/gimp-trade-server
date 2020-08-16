import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMargin1597387724593 implements MigrationInterface {
    name = 'CreateMargin1597387724593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "margin" ("datetime" TIMESTAMP NOT NULL, "upbit_price" numeric(9,0) NOT NULL, "bitmex_price" numeric(7,1) NOT NULL, "fixed_gimp" numeric(6,3) NOT NULL, "gimp" numeric(6,3) NOT NULL, "usdkrw_rate" numeric(6,3) NOT NULL, CONSTRAINT "PK_92eab4bd57ad8dc17d6d33300a6" PRIMARY KEY ("datetime"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "margin"`);
    }

}
