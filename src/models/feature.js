const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const FeatureSchema = Schema({
    name: {
        type: String
    },
    properties :  [ {type : Schema.Types.ObjectId, ref : 'Property'} ],
});
const Feature = mongoose.model("Feature", FeatureSchema)
module.exports = Feature