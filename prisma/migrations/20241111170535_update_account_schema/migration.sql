/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `provider` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropIndex
DROP INDEX "accounts_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpires",
DROP COLUMN "id",
DROP COLUMN "providerId",
DROP COLUMN "providerType",
DROP COLUMN "refreshToken",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
