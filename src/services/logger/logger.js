const winston = require('winston');

process.on('unhandledRejection', (ex) => {
    throw ex;
}); 

winston.add(winston.transports.File, {
    filename: 'errors.log',
    handleExceptions: true,
    humanReadableUnhandledException: true
});