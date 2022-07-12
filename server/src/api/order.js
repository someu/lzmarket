const Router = require("koa-router");
const { OrderBook } = require("../models");

const router = new Router({ prefix: "/order" });

router.post("/list", async (ctx, next) => {
  const { page, size, instId, action, tsGte, tsLte, interval } =
    ctx.request.body;

  const query = {};

  if (instId) {
    query.instId = instId;
  }
  if (action) {
    query.action = instId;
  }
  if (tsGte || tsLte) {
    query.$and = [];
    if (tsGte) {
      query.$and.push({ ts: { $gte: tsGte } });
    }
    if (tsLte) {
      query.$and.push({ ts: { $lte: tsLte } });
    }
  } else {
    throw new Error("请输入时间范围");
  }

  let find = OrderBook.find(query).sort({ ts: 1 });
  if (page && size) {
    find = find.skip((page - 1) * size).limit(size);
  }

  let data = await find;

  // 处理间隔
  if (interval) {
    const originData = [...data];
    const lastData = [];
    let offset = tsGte;
    while (originData.length) {
      if (originData[0].ts >= offset) {
        lastData.push(originData[0]);
        offset += interval;
      }
      originData.shift();
    }
    data = lastData;
  }

  const count = await OrderBook.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

module.exports = router.routes();
