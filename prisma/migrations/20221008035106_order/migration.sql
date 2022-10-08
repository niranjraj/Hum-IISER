/*
  Warnings:

  - You are about to drop the column `category` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "category";
