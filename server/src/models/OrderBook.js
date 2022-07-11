const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// https://www.okx.com/docs-v5/zh/#websocket-api-public-channel-order-book-channel
const _schema = new Schema({
  instId: {
    type: String,
    index: true
  }, // 交易对
  ts:  {
    type: Number,
    index: true
  }, // 时间
  data: Object, // 数据
});

const OrderBook = mongoose.model("OrderBook", _schema, "orderBooks");
module.exports = { OrderBook };
