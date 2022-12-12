/*
  Warnings:

  - A unique constraint covering the columns `[orderNo]` on the table `orderPayments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_orderNo_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "orderPayments_orderNo_key" ON "orderPayments"("orderNo");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orderPayments"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;
