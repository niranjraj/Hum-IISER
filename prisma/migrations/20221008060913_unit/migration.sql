/*
  Warnings:

  - The `quantity` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "unit" TEXT,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER;
