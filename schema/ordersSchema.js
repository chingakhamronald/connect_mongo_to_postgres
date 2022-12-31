const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  flightNumber: {
    type: String,
  },
  bookingInfo: {
    type: Object,
  },
  crew: {
    type: Object,
  },
  sessionId: {
    type: String,
  },
  orderNo: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("orders", orderSchema);
