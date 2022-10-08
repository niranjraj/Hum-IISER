/*
  Warnings:

  - You are about to drop the column `category` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "category" TEXT,
ALTER COLUMN "store" DROP NOT NULL;
