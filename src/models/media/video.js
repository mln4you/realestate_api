const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const VideoSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const Video = mongoose.model("Video", VideoSchema)
module.exports = Video