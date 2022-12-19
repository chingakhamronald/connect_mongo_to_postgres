/*
  Warnings:

  - You are about to drop the column `ordersOrderNo` on the `orderPayments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_ordersOrderNo_fkey";

-- AlterTable
ALTER TABLE "orderPayments" DROP COLUMN "ordersOrderNo";

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
