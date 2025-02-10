/*
  Warnings:

  - You are about to drop the column `skills` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `skillsId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `softSkills` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `softSkillsId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ProfessionalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `ProfessionalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SoftSkills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SoftSkills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `SoftSkills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_at` to the `ProfessionalProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `SoftSkills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SoftSkills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_softSkillsId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalProfile" DROP CONSTRAINT "ProfessionalProfile_memberId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "skills",
DROP COLUMN "skillsId",
DROP COLUMN "softSkills",
DROP COLUMN "softSkillsId";

-- AlterTable
ALTER TABLE "ProfessionalProfile" DROP COLUMN "createdAt",
DROP COLUMN "memberId",
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "member_id" TEXT;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "memberId" TEXT;

-- AlterTable
ALTER TABLE "SoftSkills" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "memberId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "Skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SoftSkills_name_key" ON "SoftSkills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SoftSkills_description_key" ON "SoftSkills"("description");

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftSkills" ADD CONSTRAINT "SoftSkills_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
