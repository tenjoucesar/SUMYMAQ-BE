const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const sumymaqDB = 'mongodb://localhost/sumymaq';

module.exports = function() {
  // Module still missing some last configuration on files writes
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error'
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: 'rejections.log' })
    ]
  });

  logger.add( new winston.transports.MongoDB({db: sumymaqDB, options: {useUnifiedTopology: true,}, level: 'info'}))

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
}