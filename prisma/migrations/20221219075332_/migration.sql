/*
  Warnings:

  - A unique constraint covering the columns `[iid]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "iid" SERIAL NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("iid");

-- CreateIndex
CREATE UNIQUE INDEX "orders_iid_key" ON "orders"("iid");
