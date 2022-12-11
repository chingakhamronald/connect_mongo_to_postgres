const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  flightNumber: {
    type: String,
  },
  destination: {
    type: String,
  },
  origin: {
    type: String,
  },
  crew: {
    type: Object,
  },
  bookingInfo: {
    type: Object,
  },
});

module.exports = mongoose.model("orders", orderSchema);
