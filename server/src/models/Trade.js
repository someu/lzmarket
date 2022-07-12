const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const _schema = new Schema({
  instId: { type: String, index: true },
  px: Number,
  sz: Number,
  side: String,
  ts: { type: Number, index: true },
});

const Trade = mongoose.model("Trade", _schema, "trades");
module.exports = { Trade };
