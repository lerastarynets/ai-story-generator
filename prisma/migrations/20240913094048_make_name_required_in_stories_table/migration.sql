/*
  Warnings:

  - Made the column `name` on table `stories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "stories" ALTER COLUMN "name" SET NOT NULL;
