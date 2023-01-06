import { MigrationInterface, QueryRunner } from "typeorm";

export class productHistory1672969832521 implements MigrationInterface {
    name = "productHistory1672969832521";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."product_history_currency_enum" AS ENUM('BRL', 'USD')
        `);
        await queryRunner.query(`
            CREATE TABLE "product_history" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "currency" "public"."product_history_currency_enum" NOT NULL,
                "available" boolean NOT NULL,
                "price_in_cash" numeric NOT NULL,
                "price_in_credit" numeric NOT NULL,
                "promo" boolean NOT NULL,
                "images" text array,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "product_id" uuid NOT NULL,
                CONSTRAINT "PK_235f5de8f3f653973711bc77b16" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "product_history"
            ADD CONSTRAINT "FK_d0e845cfa7cb0c5f092ae9acab1" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product_history" DROP CONSTRAINT "FK_d0e845cfa7cb0c5f092ae9acab1"
        `);
        await queryRunner.query(`
            DROP TABLE "product_history"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."product_history_currency_enum"
        `);
    }
}

