import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter_fields1720425459329 implements MigrationInterface {
  name = "Alter_fields1720425459329";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ADD "type" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "content" ADD "recipeCount" integer`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "caloriesToBurn" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD "mealType" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "content" ADD "isBookmarked" boolean`);
    await queryRunner.query(`ALTER TABLE "content" ADD "tags" json`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "videoUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD "type" character varying NOT NULL DEFAULT 'fitness_trainer'`,
    );
    await queryRunner.query(
      `ALTER TABLE "challenge" ADD "type" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "challenge" ADD "imageUrl" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "challenge" ADD "tags" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "imageUrl"`);
    await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "videoUrl"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "isBookmarked"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "mealType"`);
    await queryRunner.query(
      `ALTER TABLE "content" DROP COLUMN "caloriesToBurn"`,
    );
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "recipeCount"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "type"`);
  }
}
