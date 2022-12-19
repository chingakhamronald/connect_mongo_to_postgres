/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderNo` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderNo` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `orderOrderNo` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderno]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderno` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderno` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderOrderNo_fkey";

-- DropIndex
DROP INDEX "orders_orderNo_key";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "orderNo",
ADD COLUMN     "orderno" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "orderNo",
DROP COLUMN "orderOrderNo",
ADD COLUMN     "orderno" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ALTER COLUMN "referenceId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderno_key" ON "orders"("orderno");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");
