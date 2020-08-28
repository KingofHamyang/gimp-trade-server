import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTimezoneColumn1598546055457 implements MigrationInterface {
    name = 'ChangeTimezoneColumn1598546055457'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
