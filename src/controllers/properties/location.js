const Location = require('../../models/properties/location');
const State = require('../../models/properties/state');
const mongoose = require('mongoose');


module.exports = {
    
        // Creates location
    create: async (req, res, next) => {
         // Request input elements
        const reqLocation  = req.body.location;
        const stateIds = req.body.states;

        // Create new location
        var location = new Location({
            _id: new mongoose.Types.ObjectId(),
            name: reqLocation,
        });
        
        // If states provided then relate them to the location
        if(Array.isArray(stateIds) || stateIds){
            stateIds.forEach(async stateId => {
                await location.states.push(stateId);
            });
        }
          // Save location
        location.save();

        if(Array.isArray(stateIds) || stateIds){
            // Update location with city state
            stateIds.forEach(async stateId => {
                const updatedState = await State.findById(stateId);
                updatedState.location = location.id
                await updatedState.save();
            });
        }
        // return success
        return res.status(200).send(location);
    },
    
    
    // updates location
    update: async (req, res, next) => {
        
        // Request input elements
        const newLocation = req.body.location;
        const locationId = req.params.id;
        const stateIds = req.body.states;

        // Find location and update
        location = await Location.findById(locationId);
        location.name = newLocation;
        location.states = [];

        // If states provided then relate them to location
        if(Array.isArray(stateIds) || stateIds){
            stateIds.forEach(async stateId => {
                await location.states.push(stateId);
            });
        }
        await state.save();
        // If state provided then update them
        if(Array.isArray(stateIds) || stateIds){
            // update state with location relation
            stateIds.forEach(async stateId => {
                const state = await State.findById(stateId);
                state.location = location.id
                await state.save();
            });
        }
        return res.status(200).json(location);
    },
    

    // Show location
   show: async (req, res, next) => {
        const locationId = req.params.id;
        Location.findById(locationId).
            populate('states').exec(function (err, location) {
            return res.status(200).json(location);
        });
    },

        // Show all locations
    all: async (req, res, next) => {
        Location.find({}).populate('states').exec(function(err, locations){
            res.send(locations);  
        });
    },
    
   // Delete location by its id
   delete : async (req, res, next) => {
        const locationId = req.params.id;
        const location = await Location.findById(locationId);
        location.remove();
        res.status(200).send(location);
    }
}