const PropertyType = require('../../models/properties/property_type');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates property type
    create: async (req, res, next) => {
        // Create new property type form request object
        const reqPropertyType  = req.body.property_type;
        var propertyType = new PropertyType({
            _id: new mongoose.Types.ObjectId(),
            name: reqPropertyType,
        });
          // Save property type
          propertyType.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(propertyType);
        })
    },
    
    
    // updates property type
    update: (req, res, next) => {
        const newPopertyType = req.body.property_type;
        const propertyTypeId = req.params.id;
        PropertyType.findByIdAndUpdate(propertyTypeId, { $set: { name: newPopertyType } }, { new: true, runValidators :true}, (err, propertyType) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(propertyType);
        });
    },
    

    // Show property type
    show: async (req, res, next) => {
        
        const propertyTypeId = req.params.id;
        
        PropertyType.findById(propertyTypeId, (err, propertyType) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(propertyType);
            }
        });
    
    },
    

    // Show all property types
    all: async (req, res, next) => {
        PropertyType.find({}, function(err, propertyTypes) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(propertyTypes);  
          });
    },
    
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const propertyTypeId = req.params.id;
        const propertyType = await PropertyType.findById(propertyTypeId);
        
        if(!Array.isArray(propertyType.properties) || !propertyType.properties.length){
            await PropertyType.findByIdAndRemove(propertyTypeId, (err, propertyType) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(propertyType);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this property type, there are properties associated with it"});
        } 
    }
}