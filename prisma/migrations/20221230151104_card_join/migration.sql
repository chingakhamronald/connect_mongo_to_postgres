/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `crew` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `orders` table. All the data in the column will be lost.
  - Added the required column `date` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orders_id_key";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "crew",
DROP COLUMN "destination",
DROP COLUMN "id",
DROP COLUMN "origin",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "merchantName" TEXT,
    "merchantCity" TEXT,
    "dateTime" TEXT,
    "mId" TEXT,
    "tId" TEXT,
    "custDeviceId" DOUBLE PRECISION,
    "tipAmount" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "cardNo" TEXT,
    "txType" TEXT,
    "txStatus" TEXT,
    "type" TEXT,
    "authNo" BIGINT,
    "rrNo" DOUBLE PRECISION,
    "crType" TEXT,
    "batchNo" DOUBLE PRECISION,
    "batchTotal" TEXT,
    "loginId" DOUBLE PRECISION,
    "cardHolderMobile" DOUBLE PRECISION,
    "cardHolderName" TEXT,
    "cardTxnType" TEXT,
    "email" TEXT,
    "notes" TEXT,
    "applicationNo" TEXT,
    "folioNo" TEXT,
    "schemaType" TEXT,
    "subFundName" TEXT,
    "clientId" TEXT,
    "extraNote1" TEXT,
    "extraNote2" TEXT,
    "extraNote3" TEXT,
    "extraNote4" TEXT,
    "extraNote5" TEXT,
    "extraNote6" TEXT,
    "extraNote7" TEXT,
    "extraNote8" TEXT,
    "extraNote9" TEXT,
    "extraNote10" TEXT,
    "refno" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_id_key" ON "card"("id");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_refno_fkey" FOREIGN KEY ("refno") REFERENCES "orders"("orderno") ON DELETE RESTRICT ON UPDATE CASCADE;
