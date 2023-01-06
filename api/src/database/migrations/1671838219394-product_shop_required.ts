import { MigrationInterface, QueryRunner } from "typeorm";

export class productShopRequired1671838219394 implements MigrationInterface {
    name = 'productShopRequired1671838219394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_4a3fbcf31d8e5b56e82218673d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "shop_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_4a3fbcf31d8e5b56e82218673d8" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_4a3fbcf31d8e5b56e82218673d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "shop_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_4a3fbcf31d8e5b56e82218673d8" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
