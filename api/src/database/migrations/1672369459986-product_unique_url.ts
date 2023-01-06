import { MigrationInterface, QueryRunner } from "typeorm";

export class productUniqueUrl1672369459986 implements MigrationInterface {
    name = 'productUniqueUrl1672369459986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "UQ_22f4af809d019d27c2c672c1692" UNIQUE ("url")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "UQ_22f4af809d019d27c2c672c1692"
        `);
    }

}
