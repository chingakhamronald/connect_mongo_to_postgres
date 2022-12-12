/*
  Warnings:

  - A unique constraint covering the columns `[iid]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderNo_fkey";

-- DropIndex
DROP INDEX "orderPayments_orderNo_key";

-- DropIndex
DROP INDEX "orders_orderNo_key";

-- AlterTable
ALTER TABLE "orderPayments" ADD COLUMN     "ordersIid" INTEGER,
ALTER COLUMN "orderNo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "iid" SERIAL NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("iid");

-- CreateIndex
CREATE UNIQUE INDEX "orders_iid_key" ON "orders"("iid");

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_ordersIid_fkey" FOREIGN KEY ("ordersIid") REFERENCES "orders"("iid") ON DELETE SET NULL ON UPDATE CASCADE;
