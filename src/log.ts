const winston = require('winston')
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
const myFormat = printf(info => {
    return `${info.timestamp} [${info.module.padEnd(15, ' ')}] ${info.level}:   ${info.message}`;
});

const logger = winston.createLogger({
  level: 'debug',
  //format: winston.format.json(),
  format: combine(
      timestamp(),
      myFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    //format: winston.format.simple()
      level: 'info',
      format: winston.format.combine(
          winston.format.colorize(),
          //winston.format.simple()
          myFormat
      ),
  }));
}

class Logger{
    module: any;
    constructor(module){
        this.module = module
    }

    info(...args) {
        const message = args.map(i => JSON.stringify(i)).join(' ')
        logger.info({module: this.module, message})
    }

    debug (...args) {
        const message = args.map(i => JSON.stringify(i)).join(' ')
        logger.debug({module: this.module, message})
    }

    error (...args) {
        const message = args.map(i => JSON.stringify(i)).join(' ')
        logger.error({module: this.module, message})
    }

    warn (...args) {
        const message = args.map(i => JSON.stringify(i)).join(' ')
        logger.warn({module: this.module, message})
    }

    log (...args) {
        const message = args.map(i => JSON.stringify(i)).join(' ')
        logger.warn({module: this.module, message})
    }
}

export function newLogger(name){
    return new Logger(name)
}

