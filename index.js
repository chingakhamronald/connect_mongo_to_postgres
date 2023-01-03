const { default: mongoose } = require("mongoose");
const prisma = require("./constant/client");
const Connection = require("./database/db");
const MonthlyCount = require("./schema/monthlySchema");
const Sessions = require("./schema/sessionSchema");
const Order = require("./schema/ordersSchema");
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

  const count = await Order.find({}).count();

  const monthlyCount = await MonthlyCount.find({}).count();

  const sessions = await Sessions.find({}).count();

  // for (i = 0; i <= sessions; i += 5000) {
  //   const session = (await Sessions.find({}).limit(5000).skip(i)).map(
  //     (data) => {
  //       return {
  //         id: data.id,
  //         crew: data.crew,
  //       };
  //     }
  //   );

  //   await prisma.sessions.createMany({
  //     data: session,
  //     skipDuplicates: true,
  //   });
  // }

  // for (i = 0; i <= monthlyCount; i += 5000) {
  //   const orderList = (await MonthlyCount.find({}).limit(5000).skip(i)).map(
  //     (data) => {
  //       return {
  //         id: data._id,
  //         refno: data["Ref No"],
  //         merchantName: data["Merchant Name"],
  //         merchantCity: data["Merchant City"],
  //         dateTime: data["Tx Date Time"],
  //         mId: data.MID,
  //         tId: data.TID,
  //         custDeviceId: data.Cust_Device_Id,
  //         tipAmount: data["Tip Amount"],
  //         amount: data.Amount,
  //         cardNo: data["Card Number"],
  //         txStatus: data["Tx Status"],
  //         type: data.Type,
  //         authNo: data["Auth No"],
  //         rrNo: data["RR No"],
  //         crType: data["Cr/Db Type"],
  //         batchNo: data["Batch No"],
  //         batchTotal: data["Batch Total"],
  //         loginId: data["Login ID"],
  //         cardHolderMobile: data["Card Holder Mobile"],
  //         cardHolderName: data["Card Holder Name"],
  //         cardTxnType: data["Card Txn Type"],
  //         email: data["Card Holder Email Id"],
  //         notes: data.Notes,
  //         applicationNo: data["Application No"],
  //         folioNo: data["Folio No"],
  //         schemaType: data["Scheme Type"],
  //         subFundName: data["SubFund Name"],
  //         clientId: data.ClientId,
  //         extraNote1: data["Extra Notes 1"],
  //         extraNote2: data["Extra Notes 2"],
  //         extraNote3: data["Extra Notes 3"],
  //         extraNote4: data["Extra Notes 4"],
  //         extraNote5: data["Extra Notes 5"],
  //         extraNote6: data["Extra Notes 6"],
  //         extraNote7: data["Extra Notes 7"],
  //         extraNote8: data["Extra Notes 8"],
  //         extraNote9: data["Extra Notes 9"],
  //         extraNote10: data["Extra Notes 10"],
  //       };
  //     }
  //   );

  //   await prisma.card.createMany({
  //     data: orderList,
  //     skipDuplicates: true,
  //   });
  // }

  // for (i = 0; i <= count; i += 5000) {
  //   const order = (await Order.find({}).limit(5000).skip(i)).map((data) => {
  //     return {
  //       iid: data._id,
  //       orderno: data.orderNo,
  //       date: data.timestamp,
  //       totalAmount: data.totalAmount,
  //       flightNumber: data.flightNumber,
  //       bookingInfo: data.bookingInfo,
  //       crew: data.crew,
  //       sessionid: data.sessionId,
  //     };
  //   });

  //   await prisma.orders.createMany({
  //     data: order,
  //     skipDuplicates: true,
  //   });
  // }

  const mswipeCount = await prisma.card.count();

  for (i = 0; i <= mswipeCount; i += 5000) {
    const mswipe = (
      await prisma.$queryRaw`SELECT * FROM card  LEFT JOIN orders ON card.refno=orders.orderno LEFT JOIN sessions ON orders.sessionid=sessions.id LIMIT 5000 OFFSET ${i}`
    ).map((e) => {
      return {
        refNo: e.refno,
        merchantName: e.merchantName,
        merchantCity: e.merchantCity,
        dateTime: e.dateTime,
        mId: e.mId,
        tId: e.tId,
        custDeviceId: e.custDeviceId,
        tipAmount: e.tipAmount,
        amount: e.amount,
        cardNo: e.cardNo,
        txType: e.txType,
        txStatus: e.txStatus,
        type: e.type,
        authNo: e.authNo,
        rrNo: e.rrNo,
        crType: e.crType,
        batchNo: e.batchNo,
        batchTotal: e.batchTotal,
        loginId: e.loginId,
        cardHolderName: e.cardHolderName,
        cardHolderMobile: e.cardHolderMobile,
        flightNumber: e.flightNumber,
        pnr: e.bookingInfo?.pnr,
        mobile: e.bookingInfo?.mobile,
        seatNumber: e.bookingInfo?.seatNumber,
        customerName: e.bookingInfo?.customerName,
        sessionId: e.sessionid,
        totalAmount: e.totalAmount,
        date: e?.date,
        orderNo: e.orderno,
        email: e.email,
        crew_1_Id: e.crew === null ? null : e?.crew[0]?.employeeId,
        crew_1_Name: e.crew === null ? null : e?.crew[0]?.employeeName,
        crew_1_Position: e.crew === null ? null : e?.crew[0]?.position,
        crew_1_Code: e.crew === null ? null : e?.crew[0]?.employeeCode,
        crew_2_Id: e.crew === null ? null : e?.crew[1]?.employeeId,
        crew_2_Name: e.crew === null ? null : e?.crew[1]?.employeeName,
        crew_2_Position: e.crew === null ? null : e?.crew[1]?.position,
        crew_2_Code: e.crew === null ? null : e?.crew[1]?.employeeCode,
        crew_3_Id: e.crew === null ? null : e?.crew[2]?.employeeId,
        crew_3_Name: e.crew === null ? null : e?.crew[2]?.employeeName,
        crew_3_Position: e.crew === null ? null : e?.crew[2]?.position,
        crew_3_Code: e.crew === null ? null : e?.crew[2]?.employeeCode,
        crew_4_Id: e.crew === null ? null : e?.crew[3]?.employeeId,
        crew_4_Name: e.crew === null ? null : e?.crew[3]?.employeeName,
        crew_4_Position: e.crew === null ? null : e?.crew[3]?.position,
        crew_4_Code: e.crew === null ? null : e?.crew[3]?.employeeCode,
        extraNote1: e.extraNote1,
        extraNote2: e.extraNote2,
        extraNote3: e.extraNote3,
        extraNote4: e.extraNote4,
        extraNote5: e.extraNote5,
        extraNote6: e.extraNote6,
        extraNote7: e.extraNote7,
        extraNote8: e.extraNote8,
        extraNote9: e.extraNote9,
        extraNote10: e.extraNote10,
      };
    });
    await prisma.mswipe.createMany({
      data: mswipe,
      skipDuplicates: true,
    });
  }
})().finally(() => {
  mongoose.disconnect();
});

app.use(cors());

app.use("/api/orders", OrderRouter);

app.use("/api/monthly", MonthlyRouter);

app.listen(port, () => console.log(`server is running on ${port}`));
