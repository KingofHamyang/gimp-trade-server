import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMargins1592409073361 implements MigrationInterface {
    name = 'CreateMargins1592409073361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "margin" ("datetime" TIMESTAMP NOT NULL, "upbit_price" numeric(5,2) NOT NULL, "bitmex_price" numeric(5,2) NOT NULL, "rate" numeric(5,2) NOT NULL, CONSTRAINT "PK_92eab4bd57ad8dc17d6d33300a6" PRIMARY KEY ("datetime"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "margin"`);
    }

}
