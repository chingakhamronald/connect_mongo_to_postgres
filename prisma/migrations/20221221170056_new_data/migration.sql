/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "orders_iid_key";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "iid",
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");
