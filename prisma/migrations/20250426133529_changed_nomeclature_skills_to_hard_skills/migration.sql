/*
  Warnings:

  - You are about to drop the `skills_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "skills_members" DROP CONSTRAINT "skills_members_memberId_fkey";

-- DropForeignKey
ALTER TABLE "skills_members" DROP CONSTRAINT "skills_members_skillId_fkey";

-- DropTable
DROP TABLE "skills_members";

-- CreateTable
CREATE TABLE "hard_skills_members" (
    "memberId" TEXT NOT NULL,
    "hardSkillId" TEXT NOT NULL,

    CONSTRAINT "hard_skills_members_pkey" PRIMARY KEY ("memberId","hardSkillId")
);

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_hardSkillId_fkey" FOREIGN KEY ("hardSkillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "skills_id_uq" RENAME TO "hard_skills_id_uq";
