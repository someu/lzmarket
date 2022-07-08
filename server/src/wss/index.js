const WebSocket = require("ws");
const config = require("../config");

const Handles = {
  "optimized-books": require("./orderBooks"),
};

function startWssClient() {
  const ws = new WebSocket(config.okx.wss);

  ws.on("open", function open() {
    console.log("websocket 连接成功");
    ws.send(JSON.stringify({ op: "subscribe", args: config.okx.subscribes }));
  });

  ws.on("message", function message(dataStr) {
    const {
      arg: { channel, instId },
      action,
      data,
    } = JSON.parse(dataStr);
    if (data && Handles[channel] && typeof Handles[channel] === "function") {
      Handles[channel](instId, action, data);
    } else {
      console.log(`未处理的消息: ${channel}`);
    }
  });

  ws.on("error", function (e) {
    console.error(`websocket 出错: ${e}`);
  });
}

module.exports = {
  startWssClient,
};
