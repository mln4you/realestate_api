const mongoose = require('mongoose');

module.exports = function() {
        //connect to db
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/apiAuth',
        { 
            useNewUrlParser: true 
        }
    );
}