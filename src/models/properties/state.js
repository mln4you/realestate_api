const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const StateSchema = Schema({
    name: {
        type: String
    },
    property :   {type : Schema.Types.ObjectId, ref : 'Property'} ,
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
});
const State = mongoose.model("State", StateSchema)
module.exports = State