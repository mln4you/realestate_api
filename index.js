// dependencies
const express = require('express');
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Require all routes
const auth = require('./src/routes/auth')
const users = require('./src/routes/users');
const userTypes = require('./src/routes/userTypes');
const userRoles = require('./src/routes/userRoles');
const cityBlocks = require('./src/routes/cityBlocks');
const cities = require('./src/routes/cities');
const features = require('./src/routes/features');
const floorNumbers = require('./src/routes/floorNumbers');
const heatingTypes = require('./src/routes/heatingTypes');
const locations = require('./src/routes/locations');
const propertiesFor = require('./src/routes/propertiesFor');
const propertyTypes = require('./src/routes/propertyTypes');
const roomNumbers = require('./src/routes/roomNumbers');
const states = require('./src/routes/states');
const properties = require('./src/routes/properties');


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
app.use('/auth', auth);
app.use('/users', users);
app.use('/userTypes', userTypes);
app.use('/userRoles', userRoles);
app.use('/cityBlocks', cityBlocks);
app.use('/cities', cities);
app.use('/features', features);
app.use('/cities', cities);
app.use('/floorNumbers', floorNumbers);
app.use('/heatingTypes', heatingTypes);
app.use('/locations', locations);
app.use('/propertiesFor', propertiesFor);
app.use('/propertyTypes', propertyTypes);
app.use('/roomNumbers', roomNumbers);
app.use('/states', states);
app.use('/properties', properties);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}`))
