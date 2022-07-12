const WebSocket = require("ws");
const config = require("../config");
const { logger } = require("../utils/log");

const Handles = {
  books: require("./books"),
  trades: require("./trades"),
};

function startWssClient() {
  const ws = new WebSocket(config.okx.wss);

  ws.on("open", function open() {
    logger.info("websocket 连接成功");
    ws.send(JSON.stringify({ op: "subscribe", args: config.okx.subscribes }));
    // 每过三分钟，重新订阅
    setInterval(() => {
      logger.info(`重新订阅`);
      ws.send(
        JSON.stringify({ op: "unsubscribe", args: config.okx.subscribes })
      );
      ws.send(JSON.stringify({ op: "subscribe", args: config.okx.subscribes }));
    }, 60 * 3000);
  });

  ws.on("message", function message(dataStr) {
    const {
      event,
      arg: { channel, instId },
      action,
      data,
    } = JSON.parse(dataStr);
    if (event === "subscribe") {
      logger.info(`订阅 ${instId} ${channel} 成功`);
    } else if (event === "unsubscribe") {
      logger.info(`取消订阅 ${instId} ${channel} 成功`);
    } else if (
      data &&
      Handles[channel] &&
      typeof Handles[channel] === "function"
    ) {
      Handles[channel](instId, action, data);
    } else {
      logger.info(`未处理的消息: ${channel}`);
    }
  });

  ws.on("error", function (e) {
    logger.error(`websocket 出错: ${e}`);
  });
}

module.exports = {
  startWssClient,
};
