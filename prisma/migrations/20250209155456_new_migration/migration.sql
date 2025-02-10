/*
  Warnings:

  - You are about to drop the column `skillsId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `softSkillsId` on the `Member` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_softSkillsId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "skillsId",
DROP COLUMN "softSkillsId";

-- CreateTable
CREATE TABLE "_MemberToSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberToSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MemberToSoftSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberToSoftSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MemberToSkills_B_index" ON "_MemberToSkills"("B");

-- CreateIndex
CREATE INDEX "_MemberToSoftSkills_B_index" ON "_MemberToSoftSkills"("B");

-- AddForeignKey
ALTER TABLE "_MemberToSkills" ADD CONSTRAINT "_MemberToSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToSkills" ADD CONSTRAINT "_MemberToSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToSoftSkills" ADD CONSTRAINT "_MemberToSoftSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToSoftSkills" ADD CONSTRAINT "_MemberToSoftSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "SoftSkills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
