/*
  Warnings:

  - You are about to drop the column `ordersIid` on the `orderPayments` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iid` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNo]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_ordersIid_fkey";

-- DropIndex
DROP INDEX "orders_iid_key";

-- AlterTable
ALTER TABLE "orderPayments" DROP COLUMN "ordersIid",
ADD COLUMN     "ordersOrderNo" TEXT;

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "iid";

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNo_key" ON "orders"("orderNo");

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_ordersOrderNo_fkey" FOREIGN KEY ("ordersOrderNo") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
