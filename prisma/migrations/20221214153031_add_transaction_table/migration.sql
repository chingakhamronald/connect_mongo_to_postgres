/*
  Warnings:

  - You are about to drop the column `ordersIid` on the `orderPayments` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iid` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNo]` on the table `orderPayments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNo` to the `orderPayments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_ordersIid_fkey";

-- DropIndex
DROP INDEX "orders_iid_key";

-- AlterTable
ALTER TABLE "orderPayments" DROP COLUMN "ordersIid",
ADD COLUMN     "orderNo" TEXT NOT NULL,
ADD CONSTRAINT "orderPayments_pkey" PRIMARY KEY ("orderNo");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "iid",
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("orderNo");

-- CreateTable
CREATE TABLE "Transaction" (
    "ordersOrderNo" TEXT NOT NULL,
    "orderPaymentsOrderNo" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("ordersOrderNo","orderPaymentsOrderNo")
);

-- CreateIndex
CREATE UNIQUE INDEX "orderPayments_orderNo_key" ON "orderPayments"("orderNo");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ordersOrderNo_fkey" FOREIGN KEY ("ordersOrderNo") REFERENCES "orders"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderPaymentsOrderNo_fkey" FOREIGN KEY ("orderPaymentsOrderNo") REFERENCES "orderPayments"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;
