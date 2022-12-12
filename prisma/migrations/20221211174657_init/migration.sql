-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT,
    "flightNumber" TEXT,
    "destination" TEXT,
    "origin" TEXT,
    "crew" JSONB,
    "bookingInfo" JSONB,
    "orderNo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "orderPayments" (
    "iid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "invoiceId" TEXT,
    "amount" INTEGER,
    "cardNo" TEXT,
    "referenceId" TEXT,
    "status" TEXT NOT NULL,
    "reason" TEXT,
    "source" TEXT,
    "paymentType" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "Id" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,

    CONSTRAINT "orderPayments_pkey" PRIMARY KEY ("iid")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNo_key" ON "orders"("orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "orderPayments_id_key" ON "orderPayments"("id");

-- AddForeignKey
ALTER TABLE "orderPayments" ADD CONSTRAINT "orderPayments_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "orders"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;
