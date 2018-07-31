const Location = require('../../models/properties/location');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates location
    create: async (req, res, next) => {
        // Create new location form request object
        const reqLocation  = req.body.location;
        var location = new Location({
            _id: new mongoose.Types.ObjectId(),
            name: reqLocation,
        });
          // Save location
        location.save(function (err) {
        if (err) return res.status(500).json({error: err.message});
            return res.status(200).json(location);
        })
    },
    
    
    // updates location
    update: (req, res, next) => {
        const newLocation = req.body.location;
        const locationId = req.params.id;
        Location.findByIdAndUpdate(locationId, { $set: { name: newLocation } }, { new: true, runValidators :true}, (err, location) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(location);
        });
    },
    

    // Show location
    show: async (req, res, next) => {
        
        const locationId = req.params.id;
        
        Location.findById(locationId, (err, location) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(location);
            }
        });
    
    },
    

    // Show all locations
    all: async (req, res, next) => {
        
        Location.find({}, function(err, locations) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(locations);  
          });
    },
    
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const locationId = req.params.id;
        const location = await Location.findById(locationId);
        
        if(!Array.isArray(location.states) || !location.states){
            await Location.findByIdAndRemove(locationId, (err, location) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(location);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this location, there are properties associated with it"});
        } 
    }
}