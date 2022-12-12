const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const Order = require("./schema/ordersSchema");
const OrderPayments = require("./schema/orderPaymentSchema");
const dotenv = require("dotenv");
const Express = require("express");
const app = Express();
const OrderRouter = require("./app/orders/router");
dotenv.config();

const port = process.env.PORT;

(async () => {
  await Connection();

  const orderPaymentCount = await OrderPayments.find({}).count();

  const count = await Order.find({}).count();

  for (i = 0; i <= orderPaymentCount; i += 500) {
    const orderPayment = (await OrderPayments.find({}).limit(5000).skip(0)).map(
      (e) => {
        return {
          id: e._id + "",
          invoiceId: e.invoiceId,
          amount: e.amount,
          timestamp: e.timestamp,
          cardNo: e.cardNo,
          referenceId: e.referenceId,
          status: e.status,
          reason: e.reason,
          source: e.source,
          paymentType: e.paymentType,
          Id: e.id,
        };
      }
    );
    await prisma.orderPayments.createMany({
      data: orderPayment,
      skipDuplicates: true,
    });
  }

  for (i = 0; i <= count; i += 5000) {
    const order = (await Order.find({}).skip(0).limit(5000)).map((data) => {
      return {
        id: data._id + "",
        destination: data.destination,
        origin: data.origin,
        flightNumber: data.flightNumber,
        crew: data.crew,
        bookingInfo: data.bookingInfo,
        orderNo: data.orderNo,
      };
    });

    await prisma.orders.createMany({
      data: order,
      skipDuplicates: true,
    });
  }
})().finally(() => {
  mongoose.disconnect();
});

app.use("/api/orders", OrderRouter);

app.listen(port, () => console.log(`server is running on ${port}`));
