const State = require('../../models/properties/state');
const City = require('../../models/properties/city');
const mongoose = require('mongoose');


module.exports = {
    
    // Creates state
    create: async (req, res, next) => {
         // Request input elements
        const reqState  = req.body.state;
        const cityIds = req.body.cities;

        // Create new state
        var state = new State({
            _id: new mongoose.Types.ObjectId(),
            name: reqState,
        });

        // If cities provided then relate them to the state
        if(Array.isArray(cityIds) || cityIds){
            cityIds.forEach(async cityId => {
                await state.cities.push(cityId);
            });
        }
          // Save state
        state.save();

        if(Array.isArray(cityIds) || cityIds){
            // Update city block with city relation
            cityIds.forEach(async cityId => {
                const updatedCity = await City.findById(cityId);
                updatedCity.state = state.id
                await updatedCity.save();
            });
        }
        // return success
        return res.status(200).send(state);
    },
    
    
    // updates state
    update: async (req, res, next) => {
        
        // Request input elements
        const newState = req.body.state;
        const stateId = req.params.id;
        const cityIds = req.body.cities;

        // Find state and update
        state = await State.findById(stateId);
        state.name = newState;
        state.cities = [];

        // If cities provided then relate them to state
        if(Array.isArray(cityIds) || cityIds){
            cityIds.forEach(async cityId => {
                await state.cities.push(cityIds);
            });
        }
        await state.save();
        // If city provided then update them
        if(Array.isArray(cityIds) || cityIds){
            // update city with state relation
            cityIds.forEach(async cityId => {
                const updatedCity = await City.findById(cityId);
                updatedCity.state = state.id
                await updatedCity.save();
            });
        }
        return res.status(200).json(state);
    },
    

    // Show state
   show: async (req, res, next) => {
        const stateId = req.params.id;
        State.findById(stateId).
            populate({ 
                path: 'cities',
                populate: {
                  path: 'city_blocks',
                  model: 'CityBlock'
                } 
             }).exec(function (err, state) {
            return res.status(200).json(state);
        });
    },

        // Show all states
    all: async (req, res, next) => {
        State.find({}).populate('cities').exec(function(err, states){
            res.send(states);  
        });
    },
    
   // Delete city by its id
   delete : async (req, res, next) => {
        const stateId = req.params.id;
        const state = await State.findById(stateId);
        state.remove();
        res.status(200).send(state);
    }
}