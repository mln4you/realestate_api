const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const CitySchema = Schema({
    name: {
        type: String
    },
    city :   {type : Schema.Types.ObjectId, ref : 'City'} ,
    city_blocks: [{ type: Schema.Types.ObjectId, ref: 'CityBlock' }],
});
const City = mongoose.model("City", CitySchema)
module.exports = City