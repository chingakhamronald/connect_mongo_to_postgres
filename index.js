const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const Order = require("./schema/ordersSchema");
const OrderPayments = require("./schema/orderPaymentSchema");
const dotenv = require("dotenv");
const Express = require("express");
const cors = require("cors");
const app = Express();
const OrderRouter = require("./app/orders/router");
dotenv.config();

const port = process.env.PORT;

(async () => {
  await Connection();

  const orderPaymentCount = await OrderPayments.find({}).count();

  const count = await Order.find({}).count();

  for (i = 0; i <= orderPaymentCount; i += 5000) {
    const orderPayment = (await OrderPayments.find({}).limit(5000).skip(i)).map(
      (e) => {
        return {
          id: e._id + "",
          invoiceId: e.invoiceId,
          cardNo: e.cardNo,
          status: e.status,
          timestamp: e.timestamp,
          amount: e.amount,
          referenceId: e.referenceId,
          source: e.source,
          paymentType: e.paymentType,
          reason: e.reason,
          iid: e.id,
          orderno: e.orderNo,
        };
      }
    );

    await prisma.payments.createMany({
      data: orderPayment,
      skipDuplicates: true,
    });
  }

  for (i = 0; i <= count; i += 5000) {
    const order = (await Order.find({}).limit(5000).skip(i)).map((data) => {
      return {
        id: data._id + "",
        destination: data.destination,
        origin: data.origin,
        flightNumber: data.flightNumber,
        crew: data.crew,
        bookingInfo: data.bookingInfo,
        orderno: data.orderNo,
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

app.use(cors());

app.use("/api/orders", OrderRouter);

app.listen(port, () => console.log(`server is running on ${port}`));
