/*
  Warnings:

  - The primary key for the `orderPayments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iid` on the `orderPayments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_orderNo_fkey";

-- AlterTable
ALTER TABLE "orderPayments" DROP CONSTRAINT "orderPayments_pkey",
DROP COLUMN "iid",
ALTER COLUMN "orderNo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
