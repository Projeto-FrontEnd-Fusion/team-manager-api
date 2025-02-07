import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738879407748 implements MigrationInterface {
    name = 'Migration1738879407748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professional_profile" ("id" character varying(64) NOT NULL, "createdAt" character varying, "updatedAt" character varying, "platform" character varying NOT NULL, "url" character varying NOT NULL, "memberId" character varying(64), CONSTRAINT "PK_1ce3d6cad9c742bf11d71879f5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" character varying(64) NOT NULL, "createdAt" character varying, "updatedAt" character varying, "projectName" character varying NOT NULL, "projectCover" character varying NOT NULL, "description" character varying NOT NULL, "technologies" text NOT NULL, "projectUrl" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" character varying(64) NOT NULL, "createdAt" character varying, "updatedAt" character varying, "name" character NOT NULL, "stack" character varying NOT NULL, "communityLevel" character varying NOT NULL, "currentSquad" character varying NOT NULL, "skills" text NOT NULL, "softSkills" text NOT NULL, "profileImage" character varying NOT NULL, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_members_member" ("projectId" character varying(64) NOT NULL, "memberId" character varying(64) NOT NULL, CONSTRAINT "PK_305f22250d35d7be8671e1df8fe" PRIMARY KEY ("projectId", "memberId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f126532e0e39488c4ab79b1630" ON "project_members_member" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_988dca8060aef04d09c9153531" ON "project_members_member" ("memberId") `);
        await queryRunner.query(`ALTER TABLE "professional_profile" ADD CONSTRAINT "FK_dc56f9af38f30dc9dd9abac6b89" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members_member" ADD CONSTRAINT "FK_f126532e0e39488c4ab79b16302" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members_member" ADD CONSTRAINT "FK_988dca8060aef04d09c9153531e" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_members_member" DROP CONSTRAINT "FK_988dca8060aef04d09c9153531e"`);
        await queryRunner.query(`ALTER TABLE "project_members_member" DROP CONSTRAINT "FK_f126532e0e39488c4ab79b16302"`);
        await queryRunner.query(`ALTER TABLE "professional_profile" DROP CONSTRAINT "FK_dc56f9af38f30dc9dd9abac6b89"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_988dca8060aef04d09c9153531"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f126532e0e39488c4ab79b1630"`);
        await queryRunner.query(`DROP TABLE "project_members_member"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "professional_profile"`);
    }

}
