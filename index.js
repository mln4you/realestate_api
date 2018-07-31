// dependencies
const express = require('express');
const port = process.env.PORT || 5000;


// app init
const app = express();


require('./src/services/logger/logger');
require('./src/db/db.js')();
require('./src/middleware/globalMiddleware')(app);
require('./src/routes/routes')(app);


// start server
app.listen(port, () => console.info(`Example app listening on port ${port}`))
