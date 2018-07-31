const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const LocationSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
    states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
});
const Location = mongoose.model("Location", LocationSchema)
module.exports = Location