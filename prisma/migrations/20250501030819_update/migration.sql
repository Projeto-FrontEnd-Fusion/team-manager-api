/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthDate",
DROP COLUMN "first_name",
DROP COLUMN "last_name";
