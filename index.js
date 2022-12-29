const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const MonthlyCount = require("./schema/monthlySchema");
const dotenv = require("dotenv");
const Express = require("express");
const cors = require("cors");
const app = Express();
const OrderRouter = require("./app/orders/router");
const MonthlyRouter = require("./app/monthly/router");
dotenv.config();

const port = process.env.PORT;

(async () => {
  await Connection();

  // const orderPaymentCount = await OrderPayments.find({}).count();

  // const count = await Order.find({}).count();

  // for (i = 0; i <= orderPaymentCount; i += 5000) {
  //   const orderPayment = (await OrderPayments.find({}).limit(5000).skip(i)).map(
  //     (e) => {
  //       return {
  //         id: e._id + "",
  //         invoiceId: e.invoiceId,
  //         cardNo: e.cardNo,
  //         status: e.status,
  //         timestamp: e.timestamp,
  //         amount: e.amount,
  //         referenceId: e.referenceId,
  //         source: e.source,
  //         paymentType: e.paymentType,
  //         reason: e.reason,
  //         iid: e.id,
  //         orderno: e.orderNo,
  //       };
  //     }
  //   );

  //   await prisma.payments.createMany({
  //     data: orderPayment,
  //     skipDuplicates: true,
  //   });
  // }

  // for (i = 0; i <= count; i += 5000) {
  //   const order = (await Order.find({}).limit(5000).skip(i)).map((data) => {
  //     return {
  //       iid: data._id + "",
  //       destination: data.destination,
  //       origin: data.origin,
  //       flightNumber: data.flightNumber,
  //       crew: data.crew,
  //       bookingInfo: data.bookingInfo,
  //       orderno: data.orderNo,
  //     };
  //   });

  //   await prisma.orders.createMany({
  //     data: order,
  //     skipDuplicates: true,
  //   });
  // }

  const monthlyCount = await MonthlyCount.find({}).count();

  // for (i = 0; i <= monthlyCount; i += 4000) {
  const orderList = (await MonthlyCount.find({}).limit(40).skip()).map(
    (data) => {
      return {
        id: data._id,
        merchantName: data["Merchant Name"],
        merchantCity: data["Merchant City"],
        dateTime: data["Tx Date Time"],
        mId: data.MID,
        tId: data.TID,
        custDeviceId: data.Cust_Device_Id,
        tipAmount: data["Tip Amount"],
        amount: data.Amount,
        cardNo: data["Card Number"],
        txStatus: data["Tx Status"],
        type: data.Type,
        authNo: data["Auth No"],
        rrNo: data["RR No"],
        crType: data["Cr/Db Type"],
        batchNo: data["Batch No"],
        batchTotal: data["Batch Total"],
        loginId: data["Login ID"],
        cardHolderMobile: data["Card Holder Mobile"],
        cardHolderName: data["Card Holder Name"],
        cardTxnType: data["Card Txn Type"],
        email: data["Card Holder Email Id"],
        refNo: data["Ref No"],
        notes: data.Notes,
        applicationNo: data["Application No"],
        folioNo: data["Folio No"],
        schemaType: data["Scheme Type"],
        subFundName: data["SubFund Name"],
        clientId: data.ClientId,
        extraNote1: data["Extra Notes 1"],
        extraNote2: data["Extra Notes 2"],
        extraNote3: data["Extra Notes 3"],
        extraNote4: data["Extra Notes 4"],
        extraNote5: data["Extra Notes 5"],
        extraNote6: data["Extra Notes 6"],
        extraNote7: data["Extra Notes 7"],
        extraNote8: data["Extra Notes 8"],
        extraNote9: data["Extra Notes 9"],
        extraNote10: data["Extra Notes 10"],
      };
    }
  );

  await prisma.card.createMany({
    data: orderList,
    skipDuplicates: true,
  });
  // }
})().finally(() => {
  mongoose.disconnect();
});

app.use(cors());

app.use("/api/orders", OrderRouter);

app.use("/api/monthly", MonthlyRouter);

app.listen(port, () => console.log(`server is running on ${port}`));
