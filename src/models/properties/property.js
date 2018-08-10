const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create property Schema & Model

const PropertySchema = Schema({
    
    property_for : { type: Schema.Types.ObjectId, ref: 'PropertyFor' },
    property_type : { type: Schema.Types.ObjectId, ref: 'PropertyType' },
    room_number : { type: Schema.Types.ObjectId, ref: 'RoomNumber' },
    floor_number : { type: Schema.Types.ObjectId, ref: 'FloorNumber' },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    price : {
        type: Number,
        required: [true, "Price is required"]
    },
    featured: {
        type : Boolean,
    },
    no_of_views: {
        type : Number
    },
    area: {
        type: Number,
        required: [true, "Area is required"]
    },
    price_prefix : {
        type : String,
        required : false
    },
    location: { type: Schema.Types.ObjectId, ref: 'State' },
    latitude: {
        type : Number
    },
    longitude: {
        type: Number
    },
    desc : {
        type: String,
        required : [false, "Description is required"]
    },
    registered : {
        type: Boolean
    },
    bedrooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    bussiness: {
        type: Boolean
    },
    amenities: [ {type : Schema.Types.ObjectId, ref : 'Amenity'} ],
    heating_type : { type: Schema.Types.ObjectId, ref: 'HeatingType' },
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    favorite: { type: Schema.Types.ObjectId, ref: 'User' },
    pictures: [ {type : Schema.Types.ObjectId, ref : 'Picture'} ],
    videos: [ {type : Schema.Types.ObjectId, ref : 'Video'} ],
    },
{
    timestamps: true
});

const Property = mongoose.model("Property", PropertySchema)
module.exports = Property