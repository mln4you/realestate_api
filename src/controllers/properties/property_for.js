const PropertyFor = require('../../models/properties/property_for');
const mongoose = require('mongoose');


module.exports = {
    
    // Creates property for
    create: async (req, res, next) => {
        // Create new property for form request object
        const reqPropertyFor  = req.body.property_for;
        var propertyFor = new PropertyFor({
            _id: new mongoose.Types.ObjectId(),
            name: reqPropertyFor,
        });
          // Save property for
          propertyFor.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(propertyFor);
        })
    },
    
    // updates property for
    update: (req, res, next) => {
        const newPopertyFor = req.body.property_for;
        const propertyForId = req.params.id;
        PropertyFor.findByIdAndUpdate(propertyForId, { $set: { name: newPopertyFor } }, { new: true, runValidators :true}, (err, propertyFor) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(propertyFor);
        });
    },
    
    // Show property for
    show: async (req, res, next) => {
        
        const propertyForId = req.params.id;
        
        PropertyFor.findById(propertyForId, (err, propertyFor) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(propertyFor);
            }
        });
    
    },
    
    // Show all properties for
    all: async (req, res, next) => {
        PropertyFor.find({}, function(err, propertiesFor) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(propertiesFor);  
          });
    },
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const propertyForId = req.params.id;
        const propertyFor = await PropertyFor.findById(propertyForId);
        
        if(!Array.isArray(propertyFor.properties) || !propertyFor.properties.length){
            await PropertyFor.findByIdAndRemove(propertyForId, (err, propertyFor) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(propertyFor);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this property for, there are properties associated with it"});
        } 
    }
}