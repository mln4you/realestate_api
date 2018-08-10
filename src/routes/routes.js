const catchError = require('../middleware/catchErrorMiddleware');
// if used in express use this package
require('express-async-errors');
//if used without expres, wrap all endpoints in routes with this function
//cont asyncError = require('../middleware/asyncErrorMiddleware');

module.exports = (app) => {
    
// Require all routes
const auth = require('./users/auth')
const users = require('./users/users');
const userTypes = require('./users/userTypes');
const userRoles = require('./users/userRoles');
const cityBlocks = require('./properties/cityBlocks');
const cities = require('./properties/cities');
const floorNumbers = require('./properties/floorNumbers');
const heatingTypes = require('./properties/heatingTypes');
const propertiesFor = require('./properties/propertiesFor');
const propertyTypes = require('./properties/propertyTypes');
const roomNumbers = require('./properties/roomNumbers');
const states = require('./properties/states');
const properties = require('./properties/properties');

// routes
app.use('/auth', auth);
app.use('/users', users);
app.use('/userTypes', userTypes);
app.use('/userRoles', userRoles);
app.use('/cityBlocks', cityBlocks);
app.use('/cities', cities);
app.use('/cities', cities);
app.use('/floorNumbers', floorNumbers);
app.use('/heatingTypes', heatingTypes);
app.use('/propertiesFor', propertiesFor);
app.use('/propertyTypes', propertyTypes);
app.use('/roomNumbers', roomNumbers);
app.use('/states', states);
app.use('/properties', properties);

app.use(catchError);
}