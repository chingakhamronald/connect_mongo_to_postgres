-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderNo_fkey";

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "invoiceId" TEXT,
ADD COLUMN     "orderOrderNo" TEXT;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderOrderNo_fkey" FOREIGN KEY ("orderOrderNo") REFERENCES "orders"("orderNo") ON DELETE SET NULL ON UPDATE CASCADE;
