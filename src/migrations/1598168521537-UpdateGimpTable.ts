import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateGimpTable1598168521537 implements MigrationInterface {
    name = 'UpdateGimpTable1598168521537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gimp" ALTER COLUMN "fixed_gimp" TYPE numeric(6,3)`);
        await queryRunner.query(`ALTER TABLE "gimp" ALTER COLUMN "gimp" TYPE numeric(6,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gimp" ALTER COLUMN "gimp" TYPE numeric(9,0)`);
        await queryRunner.query(`ALTER TABLE "gimp" ALTER COLUMN "fixed_gimp" TYPE numeric(9,0)`);
    }

}
