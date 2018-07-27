const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const CityBlockSchema = Schema({
    name: {
        type: String
    },
    city :   {type : Schema.Types.ObjectId, ref : 'City'} ,
});
const CityBlock = mongoose.model("CityBlock", CityBlockSchema)
module.exports = CityBlock