const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderPaymentSchema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  invoiceId: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
  },
  cardNo: {
    type: String,
    require: true,
  },
  referenceId: {
    type: String,
  },
  status: {
    type: String,
  },
  reason: {
    type: String,
  },
  source: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  orderNo: {
    type: String,
    require: true,
  },
  timestamp: {
    type: Date,
  },
  id: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model(
  "order_Payments",
  orderPaymentSchema,
  "orderPayments"
);
