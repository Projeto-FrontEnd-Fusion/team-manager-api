/*
  Warnings:

  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MemberToProjects" DROP CONSTRAINT "_MemberToProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "hard_skills_members" DROP CONSTRAINT "hard_skills_members_hardSkillId_fkey";

-- DropForeignKey
ALTER TABLE "hard_skills_members" DROP CONSTRAINT "hard_skills_members_memberId_fkey";

-- DropForeignKey
ALTER TABLE "professional_profile" DROP CONSTRAINT "professional_profile_member_id_fkey";

-- DropForeignKey
ALTER TABLE "soft_skills_members" DROP CONSTRAINT "soft_skills_members_memberId_fkey";

-- DropTable
DROP TABLE "member";

-- DropTable
DROP TABLE "skills";

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "community_level" TEXT NOT NULL,
    "current_squad" TEXT,
    "profileImageUrl" TEXT,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hard_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "hard_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_id_uq" ON "members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hard_skills_id_uq" ON "hard_skills"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hard_skills_name_key" ON "hard_skills"("name");

-- AddForeignKey
ALTER TABLE "professional_profile" ADD CONSTRAINT "professional_profile_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_hardSkillId_fkey" FOREIGN KEY ("hardSkillId") REFERENCES "hard_skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soft_skills_members" ADD CONSTRAINT "soft_skills_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProjects" ADD CONSTRAINT "_MemberToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
