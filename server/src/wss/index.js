const WebSocket = require("ws");
const config = require("../config");
const { logger } = require("../utils/log");

const Handles = {
  books: require("./books"),
  trades: require("./trades"),
};

class WssClient {
  constructor() {
    this.ws = null;
    this.startTimer = -1;
    this.pingTimer = -1;
    this.poneTimer = -1;
    this.start = this.start.bind(this);
    this.heartbeat = this.heartbeat.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  start() {
    // 启动连接
    clearTimeout(this.pingTimer);
    clearTimeout(this.poneTimer);
    if (this.ws) {
      this.ws.terminate();
    }
    logger.info("开始连接 websock")
    const ws = new WebSocket(config.okx.wss);
    this.ws = ws;
    ws.on("open", this.onOpen);
    ws.on("message", this.onMessage);
    ws.on("error", this.onError);
    ws.on("close", this.onClose);
    // 若没有连接成功，则不断重连
    this.startTimer = setTimeout(this.start, 5000);
  }
  heartbeat() {
    this.pingTimer = setTimeout(() => {
      logger.info("ping");
      this.ws.send("ping");
      this.poneTimer = setTimeout(this.start, 2000);
      this.heartbeat();
    }, 15000);
  }
  onOpen() {
    logger.info("websocket 连接成功");
    clearTimeout(this.startTimer);
    this.heartbeat();
    this.ws.send(
      JSON.stringify({ op: "subscribe", args: config.okx.subscribes })
    );
  }
  onMessage(buffer) {
    const dataStr = buffer ? buffer.toString() : "";

    // pong信息
    if (dataStr === "pong") {
      logger.info("pong");
      clearTimeout(this.poneTimer);
      return;
    }

    // 订阅信息
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
  }
  onError(e) {
    logger.error(`websocket 出错: ${e}`);
  }
  onClose() {
    logger.warn("websocket 连接断开");
  }
}

function startWssClient() {
  new WssClient().start();
}

module.exports = {
  startWssClient,
};
