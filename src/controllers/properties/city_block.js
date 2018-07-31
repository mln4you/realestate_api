const CityBlock = require('../../models/properties/city_block');
const mongoose = require('mongoose');


module.exports = {
    
    // Creates new city block
    create: async (req, res, next) => {
        // Create new city block form request object
        const reqCityBlock  = req.body.city_block;
        var cityBlock = new CityBlock({
            _id: new mongoose.Types.ObjectId(),
            name: reqCityBlock,
          });
          // Save city block
          cityBlock.save(function (err) {

            if (err) return res.status(500).json({error: err.messageerr});
          
        return res.status(200).json(cityBlock);
        })
    },
    // updates city block
    update: (req, res, next) => {
        const newCityBlock = req.body.city_block;
        const cityBlockId = req.params.id;
        CityBlock.findByIdAndUpdate(cityBlockId, { $set: { name: newCityBlock } }, { new: true, runValidators :true}, (err, cityBlock) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(cityBlock);
        });
    },
    show: async (req, res, next) => {
        const cityBlockId = req.params.id;
        CityBlock.findById(cityBlockId, (err, cityBlock) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(cityBlock);
            }
        });
    
    },
    all: async (req, res, next) => {
        CityBlock.find({}, function(err, cityBlocks) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(cityBlocks);  
          });
    },
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        const cityBlockId = req.params.id;
        const cityBlock = await CityBlock.findById(cityBlockId);
        
        if(!Array.isArray(cityBlock.properties) || !cityBlock.properties.length){
            await CityBlock.findByIdAndRemove(cityBlockId, (err, cityBlock) => {
                if(err){
                    return res.status(500).json({error: err.message});
                }
                return res.status(200).json(cityBlock);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this city block, there are properties associated with it"});
        } 
    }
}