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
const { card, mswipe } = require("./constant/client");
dotenv.config();

const port = process.env.PORT;

(async () => {
  await Connection();

  const count = await Order.find({}).count();

  const monthlyCount = await MonthlyCount.find({}).count();

  const sessions = await Sessions.find({}).count();

  const cardCount = await prisma.card.count();

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
  //   const monthlyList = (await MonthlyCount.find({}).limit(5000).skip(i)).map(
  //     (data) => {
  //       return {
  //         id: data._id,
  //         ref_no: data["Ref No"],
  //         merchant_name: data["Merchant Name"],
  //         merchant_city: data["Merchant City"],
  //         date_time: data["Tx Date Time"],
  //         m_id: data.MID,
  //         t_id: data.TID,
  //         cust_device_id: data.Cust_Device_Id,
  //         tip_amount: data["Tip Amount"],
  //         amount: data.Amount,
  //         card_no: data["Card Number"],
  //         tx_status: data["Tx Status"],
  //         type: data.Type,
  //         auth_no: data["Auth No"],
  //         rr_no: data["RR No"],
  //         cr_type: data["Cr/Db Type"],
  //         batch_no: data["Batch No"],
  //         batch_total: data["Batch Total"],
  //         login_id: data["Login ID"],
  //         card_holder_mobile: data["Card Holder Mobile"],
  //         card_holder_name: data["Card Holder Name"],
  //         card_txn_type: data["Card Txn Type"],
  //         email: data["Card Holder Email Id"],
  //         notes: data.Notes,
  //         application_no: data["Application No"],
  //         folio_no: data["Folio No"],
  //         schema_type: data["Scheme Type"],
  //         sub_fund_name: data["SubFund Name"],
  //         client_id: data.ClientId,
  //         extra_note1: data["Extra Notes 1"],
  //         extra_note2: data["Extra Notes 2"],
  //         extra_note3: data["Extra Notes 3"],
  //         extra_note4: data["Extra Notes 4"],
  //         extra_note5: data["Extra Notes 5"],
  //         extra_note6: data["Extra Notes 6"],
  //         extra_note7: data["Extra Notes 7"],
  //         extra_note8: data["Extra Notes 8"],
  //         extra_note9: data["Extra Notes 9"],
  //         extra_note10: data["Extra Notes 10"],
  //       };
  //     }
  //   );

  //   await prisma.card.createMany({
  //     data: monthlyList,
  //   });
  // }

  // for (i = 0; i <= count; i += 5000) {
  //   const lastOrderId = await Order.find().limit(5000).skip(i);

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

  //   if (order.pop().iid !== lastOrderId.pop()._id) {
  //     await prisma.orders.createMany({
  //       data: order,
  //       skipDuplicates: true,
  //     });
  //   }
  // }

  // for (i = 0; i <= cardCount; i += 5000) {
  //   const mswipe = (
  //     await prisma.$queryRaw`SELECT * FROM card  LEFT JOIN orders ON card.ref_no=orders.orderno LEFT JOIN sessions ON orders.sessionid=sessions.id
  //      LIMIT 5000 OFFSET ${i}`
  //   ).map((e) => {
  //     return {
  //       refNo: e.ref_no,
  //       merchantName: e.merchant_name,
  //       merchantCity: e.merchant_city,
  //       dateTime: e.date_time,
  //       mId: e.m_id,
  //       tId: e.t_id,
  //       custDeviceId: e.cust_device_id,
  //       tipAmount: e.tip_amount,
  //       amount: e.amount,
  //       cardNo: e.card_no,
  //       txType: e.tx_type,
  //       txStatus: e.tx_status,
  //       type: e.type,
  //       authNo: e.auth_no,
  //       rrNo: e.rr_no,
  //       crType: e.cr_type,
  //       batchNo: e.batch_no,
  //       batchTotal: e.batch_total,
  //       loginId: e.login_id,
  //       cardHolderName: e.card_holder_name,
  //       cardHolderMobile: e.card_holder_mobile,
  //       flightNumber: e.flightNumber,
  //       pnr: e.bookingInfo?.pnr,
  //       mobile: e.bookingInfo?.mobile,
  //       seatNumber: e.bookingInfo?.seatNumber,
  //       customerName: e.bookingInfo?.customerName,
  //       sessionId: e.sessionid,
  //       totalAmount: e.totalAmount,
  //       date: e?.date,
  //       orderNo: e.orderno,
  //       email: e.email,
  //       crew_1_Id: e.crew === null ? null : e?.crew[0]?.employeeId,
  //       crew_1_Name: e.crew === null ? null : e?.crew[0]?.employeeName,
  //       crew_1_Position: e.crew === null ? null : e?.crew[0]?.position,
  //       crew_1_Code: e.crew === null ? null : e?.crew[0]?.employeeCode,
  //       crew_2_Id: e.crew === null ? null : e?.crew[1]?.employeeId,
  //       crew_2_Name: e.crew === null ? null : e?.crew[1]?.employeeName,
  //       crew_2_Position: e.crew === null ? null : e?.crew[1]?.position,
  //       crew_2_Code: e.crew === null ? null : e?.crew[1]?.employeeCode,
  //       crew_3_Id: e.crew === null ? null : e?.crew[2]?.employeeId,
  //       crew_3_Name: e.crew === null ? null : e?.crew[2]?.employeeName,
  //       crew_3_Position: e.crew === null ? null : e?.crew[2]?.position,
  //       crew_3_Code: e.crew === null ? null : e?.crew[2]?.employeeCode,
  //       crew_4_Id: e.crew === null ? null : e?.crew[3]?.employeeId,
  //       crew_4_Name: e.crew === null ? null : e?.crew[3]?.employeeName,
  //       crew_4_Position: e.crew === null ? null : e?.crew[3]?.position,
  //       crew_4_Code: e.crew === null ? null : e?.crew[3]?.employeeCode,
  //       extra_note1: e.extraNote1,
  //       extra_note2: e.extraNote2,
  //       extra_note3: e.extraNote3,
  //       extra_note4: e.extraNote4,
  //       extra_note5: e.extraNote5,
  //       extra_note6: e.extraNote6,
  //       extra_note7: e.extraNote7,
  //       extra_note8: e.extraNote8,
  //       extra_note9: e.extraNote9,
  //       extra_note10: e.extraNote10,
  //     };
  //   });
  //   await prisma.mswipe.createMany({
  //     data: mswipe,
  //   });
  // }
})().finally(() => {
  mongoose.disconnect();
});

app.use(cors());

app.use("/api/orders", OrderRouter);

app.use("/api/monthly", MonthlyRouter);

app.listen(port, () => console.log(`server is running on ${port}`));
