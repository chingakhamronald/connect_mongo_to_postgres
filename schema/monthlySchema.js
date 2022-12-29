const mongoose = require("mongoose");
const { Schema } = mongoose;

const monthlySchema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  "Merchant Name": {
    type: String,
  },
  "Merchant City": {
    type: String,
  },
  "Tx Date Time": {
    type: String,
  },
  MID: {
    type: String,
  },
  TID: {
    type: String,
  },
  Cust_Device_Id: {
    type: Number,
  },
  "Tip Amount": {
    type: Number,
  },
  Amount: {
    type: Number,
  },
  "Card Number": {
    type: String,
  },
  "Tx Status": {
    type: String,
  },
  Type: {
    type: String,
  },
  "Auth No": {
    type: Number,
  },
  "RR No": {
    type: Number,
  },
  "Cr/Db Type": {
    type: String,
  },
  "Batch No": {
    type: Number,
  },
  "Batch Total": {
    type: String,
  },
  "Login ID": {
    type: Number,
  },
  "Card Holder Mobile": {
    type: Number,
  },
  "Card Holder Email Id": {
    type: String,
  },
  "Ref No": {
    type: String,
  },
  Notes: {
    type: String,
  },
  "Application No": {
    type: String,
  },
  "Folio No": {
    type: String,
  },
  "Scheme Type": {
    type: String,
  },
  "SubFund Name": {
    type: String,
  },
  ClientId: {
    type: String,
  },
  "Extra Notes 1": {
    type: String,
  },
  "Extra Notes 2": {
    type: String,
  },
  "Extra Notes 3": {
    type: String,
  },
  "Extra Notes 4": {
    type: String,
  },
  "Extra Notes 5": {
    type: String,
  },
  "Extra Notes 6": {
    type: String,
  },
  "Extra Notes 7": {
    type: String,
  },
  "Extra Notes 8": {
    type: String,
  },
  "Extra Notes 9": {
    type: String,
  },
  "Extra Notes 10": {
    type: String,
  },
  "Card Holder Name": {
    type: String,
  },
  "Tx Type": {
    type: String,
  },
  "Card Txn Type": {
    type: String,
  },
});

module.exports = mongoose.model("order_list", monthlySchema, "order_list");
