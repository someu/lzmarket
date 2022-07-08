const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const _schema = new Schema({
  testId: String,
  askOrderId: mongoose.ObjectId,
  bidOrderId: mongoose.ObjectId,
  price: Number,
  size: Number,
  createdAt: Date, // 创建时间
});

const FillHistory = mongoose.model("FillHistory", _schema, "fillHistorys");
module.exports = { FillHistory };
