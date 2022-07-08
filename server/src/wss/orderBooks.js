const { OrderBook } = require("../models");

module.exports = async function (instId, action, data) {
  const orderBooks = [];
  const now = Date.now();
  for (const item of data) {
    orderBooks.push({
      instId,
      action,
      ts: item.ts,
      checksum: item.checksum,
      data: data,
      createdAt: now,
    });
  }
  return await OrderBook.insertMany(orderBooks);
};
