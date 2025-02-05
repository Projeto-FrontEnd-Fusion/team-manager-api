import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738712267202 implements MigrationInterface {
    name = 'Migration1738712267202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" character varying(64) NOT NULL, "createdAt" character varying, "updatedAt" character varying, "projectName" character varying NOT NULL, "projectCover" character varying NOT NULL, "description" character varying NOT NULL, "technologies" text NOT NULL, "projectUrl" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" character varying(64) NOT NULL, "createdAt" character varying, "updatedAt" character varying, "name" character NOT NULL, "profileImage" character varying NOT NULL, "stack" character varying NOT NULL, "communityLevel" character varying NOT NULL, "currentSquad" character varying NOT NULL, "professionalProfile" text NOT NULL, "platform" text NOT NULL, "skills" text NOT NULL, "softSkills" text NOT NULL, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_members_member" ("projectId" character varying(64) NOT NULL, "memberId" character varying(64) NOT NULL, CONSTRAINT "PK_305f22250d35d7be8671e1df8fe" PRIMARY KEY ("projectId", "memberId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f126532e0e39488c4ab79b1630" ON "project_members_member" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_988dca8060aef04d09c9153531" ON "project_members_member" ("memberId") `);
        await queryRunner.query(`ALTER TABLE "project_members_member" ADD CONSTRAINT "FK_f126532e0e39488c4ab79b16302" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members_member" ADD CONSTRAINT "FK_988dca8060aef04d09c9153531e" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_members_member" DROP CONSTRAINT "FK_988dca8060aef04d09c9153531e"`);
        await queryRunner.query(`ALTER TABLE "project_members_member" DROP CONSTRAINT "FK_f126532e0e39488c4ab79b16302"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_988dca8060aef04d09c9153531"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f126532e0e39488c4ab79b1630"`);
        await queryRunner.query(`DROP TABLE "project_members_member"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
