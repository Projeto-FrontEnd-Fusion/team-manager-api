/*
  Warnings:

  - Added the required column `createdAt` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `ProfessionalProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "createdAt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfessionalProfile" ADD COLUMN     "createdAt" TEXT NOT NULL;
