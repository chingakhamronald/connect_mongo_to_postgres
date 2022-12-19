/*
  Warnings:

  - You are about to drop the `orderPayments` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `flightNumber` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `crew` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookingInfo` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "id" SET NOT NULL,
ALTER COLUMN "flightNumber" SET NOT NULL,
ALTER COLUMN "destination" SET NOT NULL,
ALTER COLUMN "origin" SET NOT NULL,
ALTER COLUMN "crew" SET NOT NULL,
ALTER COLUMN "bookingInfo" SET NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "orderPayments";

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "cardNo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "referenceId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "reason" TEXT,
    "iid" TEXT,
    "orderNo" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orders"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;
