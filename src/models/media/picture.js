const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const PictureSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const Picture = mongoose.model("Picture", PictureSchema)
module.exports = Picture