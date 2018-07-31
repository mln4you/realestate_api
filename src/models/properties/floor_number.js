const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const FloorNumberSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const FloorNumber = mongoose.model("FloorNumber", FloorNumberSchema)
module.exports = FloorNumber