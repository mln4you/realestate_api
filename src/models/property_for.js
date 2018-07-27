const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const PropertyForSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const PropertyFor = mongoose.model("PropertyFor", PropertyForSchema)
module.exports = PropertyFor