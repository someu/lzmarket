const Router = require("koa-router");
const { Account } = require("../models");
const mongoose = require("mongoose");

const router = new Router({ prefix: "/account" });

/**
 * 新建账户
 */
router.post("/", async (ctx, next) => {
  const { testId } = ctx.request.body;

  const query = {};

  if (testId) {
    query.testId = mongoose.Types.ObjectId(testId);
  }

  const data = await Account.find(query);
  const count = await Account.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

/**
 * 获取账户列表
 */
router.post("/list", async (ctx, next) => {
  const { testId } = ctx.request.body;

  const query = {};

  if (testId) {
    query.testId = mongoose.Types.ObjectId(testId);
  }

  const data = await Account.find(query);
  const count = await Account.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

/**
 * 修改账户
 */
router.post("/:id", async (ctx, next) => {
  const { id } = ctx.request.params;
  const { testId } = ctx.request.body;

  const query = {};

  if (testId) {
    query.testId = mongoose.Types.ObjectId(testId);
  }

  const data = await Account.find(query);
  const count = await Account.count(query);

  ctx.body = {
    code: 0,
    data,
    count,
  };
});

module.exports = router.routes();