const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const _schema = new Schema({
  testId: String,
  margin: Number,
  bidOrderId: mongoose.ObjectId,
  price: Number,
  size: Number,
  createdAt: Date,
  longPositionSize: Number,
  longPositionPrice: Number,
  shortPositionSize: Number,
  shortPositionPrice: Number,
});

const Account = mongoose.model("Account", _schema, "accounts");
module.exports = { Account };
