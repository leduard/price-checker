import { MigrationInterface, QueryRunner } from "typeorm";

export class shop1669940577178 implements MigrationInterface {
    name = 'shop1669940577178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "shop" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "url" character varying NOT NULL,
                "hostname" character varying NOT NULL,
                "logo" character varying,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "shop"
        `);
    }

}
