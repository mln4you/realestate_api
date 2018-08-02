const City = require('../../models/properties/city');
const CityBlock = require('../../models/properties/city_block');
const mongoose = require('mongoose');


module.exports = {
    
    // Creates new city
    create: async (req, res, next) => {
        
        // Request input elements
        const reqCity  = req.body.city;
        const cityBlockIds = req.body.city_blocks;
        // Creates new City
        var city = new City({
            _id: new mongoose.Types.ObjectId(),
            name: reqCity,
        });

         // If city blocks provided then relate them to city
        if(Array.isArray(cityBlockIds) || cityBlockIds){
            cityBlockIds.forEach(async cityBlockId => {
                await city.city_blocks.push(cityBlockId);
            });
        };
        
          // Save city
        await city.save();
        
         // If city blocks provided then update them
        if(Array.isArray(cityBlockIds) || cityBlockIds){
            // Update city block with city relation
            cityBlockIds.forEach(async cityBlockId => {
            const updatedCityBlock = await CityBlock.findById(cityBlockId);
            updatedCityBlock.city = city.id
            await updatedCityBlock.save();
            });
        }
        // Return success
        return res.status(200).json(city);
    },
    
    // updates city
    update: async (req, res, next) => {
        
        // Request input elements
        const newCity = req.body.city;
        const cityId = req.params.id;
        const cityBlockIds = req.body.city_blocks;

        // Find city and update
        city = await City.findById(cityId);
        city.name = newCity;
        city.city_blocks = [];

        // If city blocks provided then relate them to city
        if(Array.isArray(cityBlockIds) || cityBlockIds){
            cityBlockIds.forEach(async cityBlockId => {
                await city.city_blocks.push(cityBlockId);
            });
        }
        await city.save();
        // If city blocks provided then update them
        if(Array.isArray(cityBlockIds) || cityBlockIds){
            // update city block with city relation
            cityBlockIds.forEach(async cityBlockId => {
                const updatedCityBlock = await CityBlock.findById(cityBlockId);
                updatedCityBlock.city = city.id
                await updatedCityBlock.save();
            });
        }
        return res.status(200).json(city);
    },
    // Show city
    show: async (req, res, next) => {
        const cityId = req.params.id;
        City.findById(cityId).
            populate('city_blocks').exec(function (err, city) {
            return res.status(200).json(city);
        });
    },
    
    // Show all cities
    all: async (req, res, next) => {
        City.find({}).populate('city_blocks').exec(function(err, cities){
            res.send(cities);  
        });
    },
    
    // Delete city by its id
    delete : async (req, res, next) => {
        const cityId = req.params.id;
        const city = await City.findById(cityId);
        city.remove();
        res.status(200).send(city);
    }
}