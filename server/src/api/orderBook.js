const Router = require("koa-router");
const { OrderBook } = require("../models");

const router = new Router({ prefix: "/orderbook" });

router.post("/list", async (ctx, next) => {
  const {
    page = 1,
    size = 10,
    instId,
    action,
    tsGte,
    tsLte,
  } = ctx.request.body;

  const query = {};

  if (instId) {
    query.instId = instId;
  }
  if (action) {
    query.action = instId;
  }
  if (tsGte || tsLte) {
    query.ts = [];
    if (tsGte) {
      query.ts.push({ $get: tsGte });
    }
    if (tsLte) {
      query.ts.push({ $lte: tsLte });
    }
  }

  let find = OrderBook.find(query);
  if (page && size) {
    find = find.skip((page - 1) * size).limit(size);
  }

  const data = await find;
  const count = await OrderBook.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

module.exports = router.routes();
