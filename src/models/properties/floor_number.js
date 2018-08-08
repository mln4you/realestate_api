const mongoose = require('mongoose')
const Schema = mongoose.Schema
const property = require('./property');

//create property Schema & Model

const FloorNumberSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});

//When remove method is triggered do this before
FloorNumberSchema.pre('remove', async function (next) {
    var floor_number = this;
        const properties = Property.find({'_id': { $in: [
            floor_number.properties
        ]}});
        /// Finish this middleware
    console.log(properties);    
        next()
}); 


const FloorNumber = mongoose.model("FloorNumber", FloorNumberSchema)
module.exports = FloorNumber