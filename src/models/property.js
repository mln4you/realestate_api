const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const PropertySchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    price : {
        type: Number,
        required: [true, "Price is required"]
    }
});

const Property = mongoose.model("Property", PropertySchema)
module.exports = Property