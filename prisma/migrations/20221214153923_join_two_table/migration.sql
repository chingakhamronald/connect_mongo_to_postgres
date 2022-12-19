/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_orderPaymentsOrderNo_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_ordersOrderNo_fkey";

-- AlterTable
ALTER TABLE "orderPayments" ADD COLUMN     "ordersOrderNo" TEXT;

-- DropTable
DROP TABLE "Transaction";

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_ordersOrderNo_fkey" FOREIGN KEY ("ordersOrderNo") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
