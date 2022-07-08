const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongo.host, {
  dbName: config.mongo.db,
  user: config.mongo.user,
  pass: config.mongo.password,
  autoIndex: true,
  autoCreate: true,
});

mongoose.connection.on("reconnectFailed", () => {
  console.error("mongodb重试达到上限");
});

module.exports = {
  ...require("./OrderBook"),
  ...require("./Account"),
  ...require("./FillHistory"),
  ...require("./Order"),
  ...require("./Test"),
};
