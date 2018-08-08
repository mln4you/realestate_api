const HeatingType = require('../../models/properties/heating_type');
const mongoose = require('mongoose');


module.exports = {
    
    // Creates heating type
    create: async (req, res, next) => {
        // Create new heating type form request object
        const reqHeatingType  = req.body.heating_type;
        var heatingType = new HeatingType({
            _id: new mongoose.Types.ObjectId(),
            name: reqHeatingType,
        });
          // Save heating type
          heatingType.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(heatingType);
        })
    },
    
    // updates heating type
    update: (req, res, next) => {
        const newHeatingType = req.body.heating_type;
        const heatingTypeId = req.params.id;
        HeatingType.findByIdAndUpdate(heatingTypeId, { $set: { name: newHeatingType } }, { new: true, runValidators :true}, (err, heatingType) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(heatingType);
        });
    },
    
    // Show heating type
    show: async (req, res, next) => {
        
        const heatingTypeId = req.params.id;
        
        HeatingType.findById(heatingTypeId, (err, heatingType) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(heatingType);
            }
        });
    
    },
    
    // Show all heating type
    all: async (req, res, next) => {
        HeatingType.find({}, function(err, heatingTypes) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(heatingTypes);  
          });
    },
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const heatingTypeId = req.params.id;
        const heatingType = await HeatingType.findById(heatingTypeId);
        
        await heatingType.remove();
        
        return res.status(200).json(heatingType);
    }
}