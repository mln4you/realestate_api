const Property = require('../../models/properties/property');
const mongoose = require('mongoose');
const { decodeJWT } = require('../../services/jwt-generator');

module.exports = {
    
    // Creates new property
    create: async (req, res, next) => {
        console.log(req.value['toSaveSecondProperties']);
        // Input params for property
        const propertyFor = req.body.property_for;
        const propertyType = req.body.property_type;
        const roomNumber = req.body.room_number;
        const floorNumber = req.body.floor_number;
        const title = req.body.title;
        const price = req.body.price;
        const desc = req.body.desc;
        const featured = req.body.featured;
        const noOfViews = req.body.no_of_views;
        const area = req.body.area;
        const location = req.body.state;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const registered = req.body.registered;
        const bedRooms = req.body.bedrooms;
        const bathRooms = req.body.bathrooms;
        const bussiness = req.body.bussiness;
        const heatingType = req.body.heating_type;
        
        
        /* var property = new Property({
            _id: new mongoose.Types.ObjectId(),
            name: reqProperty,
        });

        // Get token from headers  id from decoded JWT token
        const token = req.headers['authorization']||'';
        // Get logged in user id from decoded JWT token
        const loggedUserId = decodeJWT(token).sub;
        
        //Other property request data
        const amenities = req.body.amenities;
        const pictures = req.body.pictures;
        const videos = req.body.videos;

        
          // Save property
          property.save(function (err) {

            if (err) return res.status(500).json({error: err.message}); 
          
            return res.status(200).json(property);
        }) */
    },
    
    // updates property
    update: (req, res, next) => {
        const newProperty = req.body.heating_type;
        const propertyId = req.params.id;
        Property.findByIdAndUpdate(propertyId, { $set: { name: newProperty } }, { new: true, runValidators :true}, (err, property) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(property);
        });
    },
    
    // Show property
    show: async (req, res, next) => {
        
        const propertyId = req.params.id;
        
        Property.findById(propertyId, (err, property) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(property);
            }
        });
    
    },
    
    // Show all properties
    all: async (req, res, next) => {
        Property.find({}, function(err, properties) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(properties);  
          });
    },
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        
        if(!Array.isArray(property.users) || !property.users.length){
            await Property.findByIdAndRemove(propertyId, (err, property) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(property);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this property, there are properties associated with it"});
        } 
    }
}