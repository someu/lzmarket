const { startWssClient } = require("./wss");
const { startServer } = require("./api");
require("./models");

global.onunhandledrejection = function (e) {
  console.log(`未处理的错误: ${e}`);
};

function main() {
  startWssClient();
  startServer();
}

main();
