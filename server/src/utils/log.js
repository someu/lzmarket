const log4js = require("log4js");
const config = require("../config");

log4js.configure({
  appenders: { file: { type: "file", filename: config.paths.logFile } },
  categories: { default: { appenders: ["file"], level: "debug" } },
});

const logger = log4js.getLogger("LZMServer");

module.exports = {
  logger,
};
