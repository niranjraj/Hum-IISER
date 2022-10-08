/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `store` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_orderItemId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "store" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";
