const config = require("../config");
const mongoose = require("mongoose");
const { logger } = require("../utils/log");

mongoose.connect(config.mongo.host, {
  dbName: config.mongo.db,
  user: config.mongo.user,
  pass: config.mongo.password,
  autoIndex: true,
  autoCreate: true,
});

mongoose.connection.on("reconnectFailed", () => {
  logger.error("mongodb重试达到上限");
});

module.exports = {
  ...require("./OrderBook"),
  // ...require("./Account"),
  // ...require("./FillHistory"),
  // ...require("./Order"),
  // ...require("./Test"),
};
