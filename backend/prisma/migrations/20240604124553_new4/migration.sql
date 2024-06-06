/*
  Warnings:

  - You are about to drop the column `pic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LikedBlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikedBlog" DROP CONSTRAINT "LikedBlog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "LikedBlog" DROP CONSTRAINT "LikedBlog_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pic";

-- DropTable
DROP TABLE "LikedBlog";
