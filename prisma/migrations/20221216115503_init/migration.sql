/*
  Warnings:

  - The primary key for the `orderPayments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ordersOrderNo` on the `orderPayments` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_ordersOrderNo_fkey";

-- DropIndex
DROP INDEX "orderPayments_orderNo_key";

-- AlterTable
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_pkey",
DROP COLUMN "ordersOrderNo",
ALTER COLUMN "orderNo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey";
