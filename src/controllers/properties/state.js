const State = require('../../models/properties/state');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates state
    create: async (req, res, next) => {
        // Create new state form request object
        const reqState  = req.body.state;
        var state = new State({
            _id: new mongoose.Types.ObjectId(),
            name: reqState,
        });
          // Save state
        state.save(function (err) {
        if (err) return res.status(500).json({error: err.message});
            return res.status(200).json(state);
        })
    },
    
    
    // updates state
    update: (req, res, next) => {
        const newState = req.body.state;
        const stateId = req.params.id;
        State.findByIdAndUpdate(stateId, { $set: { name: newState } }, { new: true, runValidators :true}, (err, state) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(state);
        });
    },
    

    // Show state
    show: async (req, res, next) => {
        
        const stateId = req.params.id;
        
        State.findById(stateId, (err, state) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(state);
            }
        });
    
    },
    

    // Show all states
    all: async (req, res, next) => {
        
        State.find({}, function(err, states) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(states);  
          });
    },
    
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const stateId = req.params.id;
        const state = await State.findById(stateId);
        
        if(!Array.isArray(state.cities) || !state.cities){
            await State.findByIdAndRemove(stateId, (err, state) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(state);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this state, there are properties associated with it"});
        } 
    }
}