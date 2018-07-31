const Property = require('../../models/properties/property');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates new property
    create: async (req, res, next) => {
        
        const reqProperty  = req.body.heating_type;
        var property = new Property({
            _id: new mongoose.Types.ObjectId(),
            name: reqProperty,
        });
          // Save property
          property.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(property);
        })
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