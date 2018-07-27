const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const StateSchema = Schema({
    name: {
        type: String
    },
    location :   {type : Schema.Types.ObjectId, ref : 'Location'} ,
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
});
const State = mongoose.model("State", StateSchema)
module.exports = State