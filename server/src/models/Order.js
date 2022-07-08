const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const _schema = new Schema({
  testId: String,
  accountId: mongoose.ObjectId,
  price: Number,
  size: Number,
  filledSize: Number,
  status: String,
  side: String,
  createdAt: Date,
});

const OrderBook = mongoose.model("OrderBook", _schema, "orderBooks");
module.exports = { OrderBook };
