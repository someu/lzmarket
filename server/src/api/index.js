const Koa = require("koa");
const koaBody = require("koa-body");

const config = require("../config");

async function auth(ctx, next) {
  const { apiSec } = ctx.request.body;
  if (apiSec !== config.server.apiSec) {
    throw new Error("认证失败");
  } else {
    await next();
  }
}

async function handleError(ctx, next) {
  try {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    const { method, url, body } = ctx.request;
    let log = `${method.toUpperCase()} - ${url} - ${ms}ms`;
    if (body && Object.keys(body).length) {
      log += ` - ${JSON.stringify(body)}`;
    }
    console.log(log);
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: String(e),
    };
  }
}

async function notFound(ctx, next) {
  throw new Error("not found");
}

function startServer() {
  const app = new Koa();
  app.use(handleError);

  app.use(koaBody());

  app.use(auth);
  app.use(require("./orderBook"));

  app.use(notFound);

  app.listen(config.server.listen);

  app.on("error", (error) => {
    console.error(`未知错误 ${error}`);
  });

  console.log(`服务启动成功: http://127.0.0.1:${config.server.listen}`);

  return app;
}

module.exports = {
  startServer,
};
