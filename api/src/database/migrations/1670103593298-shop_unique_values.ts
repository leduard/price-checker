import { MigrationInterface, QueryRunner } from "typeorm";

export class shopUniqueValues1670103593298 implements MigrationInterface {
    name = 'shopUniqueValues1670103593298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shop"
            ADD CONSTRAINT "UQ_03267e1dc1190dcbf796fc73fed" UNIQUE ("url")
        `);
        await queryRunner.query(`
            ALTER TABLE "shop"
            ADD CONSTRAINT "UQ_1cedaf2b0c06af885ea7733f241" UNIQUE ("hostname")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shop" DROP CONSTRAINT "UQ_1cedaf2b0c06af885ea7733f241"
        `);
        await queryRunner.query(`
            ALTER TABLE "shop" DROP CONSTRAINT "UQ_03267e1dc1190dcbf796fc73fed"
        `);
    }

}
