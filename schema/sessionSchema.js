const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  crew: {
    type: Array,
  },
});

module.exports = mongoose.model("sessions", sessionSchema);
