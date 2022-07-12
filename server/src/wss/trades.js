const { Trade } = require("../models");
module.exports = async function (instId, action, data) {
  try {
    const trades = [];
    for (const item of data) {
      trades.push({
        instId: item.instId,
        px: Number(item.px),
        sz: Number(item.sz),
        side: item.side,
        ts: Number(item.ts),
      });
    }
    await Trade.insertMany(trades);
  } catch (err) {
    logger.info(`插入trade失败: ${err}`);
  }
};
