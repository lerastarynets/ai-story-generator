/*
  Warnings:

  - You are about to drop the column `text` on the `stories` table. All the data in the column will be lost.
  - Added the required column `content` to the `stories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stories" 
RENAME COLUMN "text" TO "content";
