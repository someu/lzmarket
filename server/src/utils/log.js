const log4js = require("log4js");
const config = require("../config");

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    file: { type: "file", filename: config.paths.logFile },
  },
  categories: { default: { appenders: ["file", "out"], level: "debug" } },
});

const logger = log4js.getLogger("LZMServer");

module.exports = {
  logger,
};
