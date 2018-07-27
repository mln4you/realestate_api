const City = require('../../models/city');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates new city
    create: async (req, res, next) => {
        // Create new city form request object
        const reqCity  = req.body.city;
        var city = new City({
            _id: new mongoose.Types.ObjectId(),
            name: reqCity,
        });
          // Save city
        city.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(city);
        })
    },
    
    // updates city
    update: (req, res, next) => {
        const newCity = req.body.city;
        const cityId = req.params.id;
        City.findByIdAndUpdate(cityId, { $set: { name: newCity } }, { new: true, runValidators :true}, (err, city) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(city);
        });
    },
    
    // Show city
    show: async (req, res, next) => {
        const cityId = req.params.id;
        City.findById(cityId, (err, city) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(city);
            }
        });
    
    },
    
    // Show all cities
    all: async (req, res, next) => {
        City.find({}, function(err, city) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(city);  
          });
    },
    
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        const cityId = req.params.id;
        const city = await City.findById(cityId);
        
        if(!Array.isArray(city.city_blocks) || !city.city_blocks.length){
            await City.findByIdAndRemove(cityId, (err, city) => {
                if(err){
                    return res.status(500).json({error: err.message});
                }
                return res.status(200).json(city);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this city, there are properties associated with it"});
        } 
    }
}