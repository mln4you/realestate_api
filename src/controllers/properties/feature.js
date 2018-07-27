const Feature = require('../../models/feature');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates new feature
    create: async (req, res, next) => {
        // Create new feature form request object
        const reqFeature  = req.body.feature;
        var feature = new Feature({
            _id: new mongoose.Types.ObjectId(),
            name: reqFeature,
        });
          // Save feature
          feature.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(feature);
        })
    },
    
    // updates feature
    update: (req, res, next) => {
        const newFeature = req.body.feature;
        const featureId = req.params.id;
        Feature.findByIdAndUpdate(featureId, { $set: { name: newFeature } }, { new: true, runValidators :true}, (err, feature) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(feature);
        });
    },
    
    // Show feature
    show: async (req, res, next) => {
        
        const featureId = req.params.id;
        
        Feature.findById(featureId, (err, feature) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(feature);
            }
        });
    
    },
    
    // Show all feature
    all: async (req, res, next) => {
        Feature.find({}, function(err, features) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(features);  
          });
    },
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const featureId = req.params.id;
        const feature = await Feature.findById(featureId);
        
        if(!Array.isArray(feature.properties) || !feature.properties.length){
            await Feature.findByIdAndRemove(featureId, (err, feature) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(feature);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this feature, there are properties associated with it"});
        } 
    }
}