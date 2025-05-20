/*
  Warnings:

  - You are about to drop the column `createdAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `members` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "created_at" TEXT NOT NULL;
