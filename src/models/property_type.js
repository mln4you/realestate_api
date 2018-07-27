const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const PropertyTypeSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const PropertyType = mongoose.model("PropertyType", PropertyTypeSchema)
module.exports = PropertyType