const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const HeatingTypeSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const HeatingType = mongoose.model("HeatingType", HeatingTypeSchema)
module.exports = HeatingType