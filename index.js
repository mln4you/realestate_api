// dependencies
const express = require('express');
const port = process.env.PORT || 5000;
const winston = require('winston');

// app init
const app = express();

winston.add(winston.transports.File, {filename: 'errors.log'});

require('./src/db/db.js')();
require('./src/middleware/globalMiddleware')(app);
require('./src/routes/routes')(app);


// start server
app.listen(port, () => console.info(`Example app listening on port ${port}`))
