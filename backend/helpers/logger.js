const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const logDir = 'log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
  });

module.exports = createLogger({
    level: env === 'development'? 'debug' : 'info',
    format: format.json(),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        dailyRotateFileTransport
    ]
})
