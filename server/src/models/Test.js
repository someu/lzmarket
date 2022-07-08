const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const _schema = new Schema({
  name: String,
  startAt: Date,
  mockPeriod: Number,
  realPeriod: Number,
  makeType: String, // auto | manual
  autoMakeInterval: Number,
  price: Number, // 当前价格
  createdAt: Date,
});

const Test = mongoose.model("Test", _schema, "tests");
module.exports = { Test };
