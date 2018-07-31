const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const RoomNumberSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const RoomNumber = mongoose.model("RoomNumber", RoomNumberSchema)
module.exports = RoomNumber