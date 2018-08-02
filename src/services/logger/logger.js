const winston = require('winston');

process.on('unhandledRejection', (ex) => {
    throw ex;
}); 

winston.add(winston.transports.File, {
    filename: 'errors.log',
    handleExceptions: false, //switch to true in prod
    humanReadableUnhandledException: true
});