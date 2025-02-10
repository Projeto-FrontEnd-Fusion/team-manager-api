/*
  Warnings:

  - You are about to drop the `_MemberToSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MemberToSoftSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skills` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softSkills` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MemberToSkills" DROP CONSTRAINT "_MemberToSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToSkills" DROP CONSTRAINT "_MemberToSkills_B_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToSoftSkills" DROP CONSTRAINT "_MemberToSoftSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToSoftSkills" DROP CONSTRAINT "_MemberToSoftSkills_B_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "skills" TEXT NOT NULL,
ADD COLUMN     "skillsId" TEXT,
ADD COLUMN     "softSkills" TEXT NOT NULL,
ADD COLUMN     "softSkillsId" TEXT;

-- DropTable
DROP TABLE "_MemberToSkills";

-- DropTable
DROP TABLE "_MemberToSoftSkills";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_softSkillsId_fkey" FOREIGN KEY ("softSkillsId") REFERENCES "SoftSkills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
