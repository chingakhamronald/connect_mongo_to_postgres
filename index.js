const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const Order = require("./schema/orderSchema");

(async () => {
  await Connection();

  const count = await Order.find({}).count();

  for (i = 0; i <= count; i += 5000) {
    const order = (await Order.find({}).skip(i).limit(5000)).map((data) => {
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
