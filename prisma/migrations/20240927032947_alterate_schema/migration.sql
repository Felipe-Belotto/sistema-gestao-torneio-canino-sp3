/*
  Warnings:

  - Added the required column `pontuation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_time` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pontuation" INTEGER NOT NULL,
ADD COLUMN     "test_time" TEXT NOT NULL;
