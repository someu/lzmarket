const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// https://www.okx.com/docs-v5/zh/#websocket-api-public-channel-order-book-channel
const _schema = new Schema({
  instId: String, // 交易对
  action: String, // 动作
  ts: String, // 时间
  checksum: Number, // 校验和
  data: Object, // 数据
  createdAt: Date, // 创建时间
});

const OrderBook = mongoose.model("OrderBook", _schema, "orderBooks");
module.exports = { OrderBook };
