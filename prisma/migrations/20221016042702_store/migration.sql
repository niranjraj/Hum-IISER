/*
  Warnings:

  - You are about to drop the column `store` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "store" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "store";
