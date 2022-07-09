const { OrderBook } = require("../models");

// 全局的镜像缓存
const GlobalSnapshot = {
  asks: {},
  bids: {},
};

/**
 * 将细粒度的订单聚合成粗粒度的订单
 * @param {*} orderBooks
 * @returns Array<[price, sz, count]>
 */
function aggregateOrderBooks(orderBooks) {
  const grouped = {};
  for (const ob of orderBooks) {
    const price = parseInt(ob[0]);
    const sz = Number(ob[1]);
    const count = Number(ob[3]);
    if (!grouped[price]) {
      grouped[price] = {
        sz,
        count,
      };
    } else {
      grouped[price].sz += sz;
      grouped[price].count += count;
    }
  }
  return Object.keys(grouped)
    .sort()
    .map((price) => {
      return [Number(price), grouped[price].sz, grouped[price].count];
    })
    .filter((i) => i[1]);
}

module.exports = async function (instId, action, data) {
  try {
    if (data.length >= 2) {
      console.log(`异常数据长度: ${JSON.stringify(data)}`);
    }
    const orderBooks = [];
    for (const item of data) {
      if (action === "snapshot") {
        GlobalSnapshot.asks = {};
        GlobalSnapshot.bids = {};
      }
      for (const ask of item.asks) {
        GlobalSnapshot.asks[ask[0]] = ask;
      }
      for (const bid of item.bids) {
        GlobalSnapshot.bids[bid[0]] = bid;
      }
      // 计算出十档数
      const asks = aggregateOrderBooks(Object.values(GlobalSnapshot.asks));
      const bids = aggregateOrderBooks(Object.values(GlobalSnapshot.bids));
      orderBooks.push({
        instId,
        ts: Number(item.ts),
        data: { asks, bids },
      });
    }
    await OrderBook.insertMany(orderBooks);
  } catch (err) {
    console.log(`插入orderbook失败: ${err}`);
  }
};
