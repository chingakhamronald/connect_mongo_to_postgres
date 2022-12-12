/*
  Warnings:

  - Made the column `orderNo` on table `orderPayments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_orderNo_fkey";

-- AlterTable
ALTER TABLE "orderPayments" ALTER COLUMN "orderNo" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orders"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;
