const { startWssClient } = require("./wss");
const { startServer } = require("./api");
const { logger } = require("./utils/log");
require("./models");

global.onunhandledrejection = function (e) {
  logger.error(`未处理的错误: ${e}`);
};

function main() {
  startWssClient();
  startServer();
}

main();
