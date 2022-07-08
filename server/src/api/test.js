const Router = require("koa-router");
const { Test } = require("../models");
const mongoose = require("mongoose");

const router = new Router({ prefix: "/test" });

/**
 * 新建测试
 */
router.post("/", async (ctx, next) => {
  const { testId } = ctx.request.body;

  const query = {};

  if (testId) {
    query.testId = mongoose.Types.ObjectId(testId);
  }

  const data = await Test.find(query);
  const count = await Test.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

module.exports = router.routes();
