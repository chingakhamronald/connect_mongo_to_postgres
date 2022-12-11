const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const Order = require("./schema/ordersSchema");
const OrderPayments = require("./schema/orderPaymentSchema");

(async () => {
  await Connection();

  const orderPaymentCount = await OrderPayments.find({}).count();

  const count = await Order.find({}).count();

  for (i = 0; i <= orderPaymentCount; i += 500) {
    const orderPayment = (await OrderPayments.find({}).limit(500).skip(i)).map(
      (e) => {
        return {
          id: e._id + "",
          orderNo: e.orderNo,
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
    const data = await prisma.orderPayments.createMany({
      data: orderPayment,
      skipDuplicates: true,
    });

    console.log({ data });
  }

  // for (i = 0; i <= count; i += 5000) {
  //   const order = (await Order.find({}).skip(i).limit(5000)).map((data) => {
  //     return {
  //       id: data._id + "",
  //       destination: data.destination,
  //       origin: data.origin,
  //       flightNumber: data.flightNumber,
  //       crew: data.crew,
  //       bookingInfo: data.bookingInfo,
  //       orderNo: data.orderNo,
  //     };
  //   });

  //   await prisma.orders.createMany({
  //     data: order,
  //     skipDuplicates: true,
  //   });
  // }
})().finally(() => {
  mongoose.disconnect();
});
