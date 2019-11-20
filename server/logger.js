'use strict';
const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const config = require('../config.js');
const loggerConfig = {
  levels: {
    err: 0,
    warn: 1,
    info: 2,
    notify: 3
  },
  colors: {
    err: 'red',
    warn: 'yellow',
    info: 'green',
    notify: 'cyan'
  }
};
const loggerFormat = winston.format.printf(({ level, message, label, timestamp }) => `${timestamp} ${level}: ${message}`);
const logger = winston.createLogger({
  levels: loggerConfig.levels,
  transports: [
    new (winston.transports.Console)({
      level: config.loggerLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(
          {
            format: () => new Date().toLocaleString()
          }
        ),
        loggerFormat
      )
    })
  ]
});
winston.addColors(loggerConfig.colors);
module.exports = logger;
