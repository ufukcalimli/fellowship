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
    format: format.combine(
        format.timestamp(),
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.json(),
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf( info => `${Date.now()} ${info.level}: [${info.label}] ${info.message}`)
            )
        }),
        dailyRotateFileTransport
    ]
})


