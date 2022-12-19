/*
  Warnings:

  - You are about to drop the column `orderNo` on the `orderPayments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iid]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_orderNo_fkey";

-- AlterTable
ALTER TABLE "orderPayments" DROP COLUMN "orderNo",
ADD COLUMN     "ordersIid" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "iid" SERIAL NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("iid");

-- CreateIndex
CREATE UNIQUE INDEX "orders_iid_key" ON "orders"("iid");

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_ordersIid_fkey" FOREIGN KEY ("ordersIid") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
