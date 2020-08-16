import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1597393876572 implements MigrationInterface {
    name = 'CreateUser1597393876572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "state" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "state"`);
    }

}
