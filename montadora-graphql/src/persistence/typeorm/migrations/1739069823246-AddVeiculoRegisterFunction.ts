import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVeiculoRegisterFunction1739069823246 implements MigrationInterface {
    name = 'AddVeiculoRegisterFunction1739069823246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculo" DROP COLUMN "nome"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculo" ADD "nome" character varying NOT NULL`);
    }

}
