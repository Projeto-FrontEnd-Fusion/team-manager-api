/*
  Warnings:

  - You are about to drop the column `profileImage` on the `member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "member" DROP COLUMN "profileImage",
ADD COLUMN     "profileImageUrl" TEXT;
