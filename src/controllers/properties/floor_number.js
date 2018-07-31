const FloorNumber = require('../../models/properties/floor_number');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates floor number
    create: async (req, res, next) => {
        // Create new feature form request object
        const reqFloorNumber  = req.body.floor_number;
        var floorNumber = new FloorNumber({
            _id: new mongoose.Types.ObjectId(),
            name: reqFloorNumber,
        });
          // Save floor number
          floorNumber.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(floorNumber);
        })
    },
    
    // updates floor number
    update: (req, res, next) => {
        const newFloorNumber = req.body.floor_number;
        const floorNumberId = req.params.id;
        FloorNumber.findByIdAndUpdate(floorNumberId, { $set: { name: newFloorNumber } }, { new: true, runValidators :true}, (err, floorNumber) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(floorNumber);
        });
    },
    
    // Show floor number
    show: async (req, res, next) => {
        
        const floorNumberId = req.params.id;
        
        FloorNumber.findById(floorNumberId, (err, floorNumber) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(floorNumber);
            }
        });
    
    },
    
    // Show all floor numbers
    all: async (req, res, next) => {
        FloorNumber.find({}, function(err, floorNumbers) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(floorNumbers);  
          });
    },
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const floorNumberId = req.params.id;
        const floorNumber = await FloorNumber.findById(floorNumberId);
        
        if(!Array.isArray(floorNumber.properties) || !floorNumber.properties.length){
            await FloorNumber.findByIdAndRemove(floorNumberId, (err, floorNumber) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(floorNumber);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this floor number, there are properties associated with it"});
        } 
    }
}