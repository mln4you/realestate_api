// dependencies
const express = require('express');
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./src/routes/users');
const userTypes = require('./src/routes/userTypes');

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiAuth',
    { 
        useNewUrlParser: true 
    }
);

// app init
const app = express();

// global middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/users', users);
app.use('/userType', userTypes);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}`))
