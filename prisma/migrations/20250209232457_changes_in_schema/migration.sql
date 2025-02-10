-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_memberId_fkey";

-- DropForeignKey
ALTER TABLE "SoftSkills" DROP CONSTRAINT "SoftSkills_memberId_fkey";

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "cover" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SkillsMembers" (
    "memberId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "SkillsMembers_pkey" PRIMARY KEY ("memberId","skillId")
);

-- CreateTable
CREATE TABLE "SoftSkillsMembers" (
    "memberId" TEXT NOT NULL,
    "softSkillId" TEXT NOT NULL,

    CONSTRAINT "SoftSkillsMembers_pkey" PRIMARY KEY ("memberId","softSkillId")
);

-- AddForeignKey
ALTER TABLE "SkillsMembers" ADD CONSTRAINT "SkillsMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsMembers" ADD CONSTRAINT "SkillsMembers_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftSkillsMembers" ADD CONSTRAINT "SoftSkillsMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftSkillsMembers" ADD CONSTRAINT "SoftSkillsMembers_softSkillId_fkey" FOREIGN KEY ("softSkillId") REFERENCES "SoftSkills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
