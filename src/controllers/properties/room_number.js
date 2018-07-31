const RoomNumber = require('../../models/properties/room_number');
//const mongoose = require('mongoose');


module.exports = {
    
    // Creates room number
    create: async (req, res, next) => {
        // Create new room number form request object
        const reqRoomNumber  = req.body.room_number;
        var roomNumber = new RoomNumber({
            _id: new mongoose.Types.ObjectId(),
            name: reqRoomNumber,
        });
          // Save room number
          roomNumber.save(function (err) {

            if (err) return res.status(500).json({error: err.message});
          
            return res.status(200).json(roomNumber);
        })
    },
    
    
    // updates room number
    update: (req, res, next) => {
        const newRoomNumber = req.body.room_number;
        const roomNumberId = req.params.id;
        RoomNumber.findByIdAndUpdate(roomNumberId, { $set: { name: newRoomNumber } }, { new: true, runValidators :true}, (err, roomNumber) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: err.message});
            }
            return res.status(200).json(roomNumber);
        });
    },
    

    // Show room number
    show: async (req, res, next) => {
        
        const roomNumberId = req.params.id;
        
        RoomNumber.findById(roomNumberId, (err, roomNumber) => {
            if(err){
                return res.status(500).json({error: err.message});
            }else{
                return res.status(200).json(roomNumber);
            }
        });
    
    },
    

    // Show all room numbers
    all: async (req, res, next) => {
        
        RoomNumber.find({}, function(err, roomNumbers) {
            /* var cityBlockMap = {};
        
            cityBlocks.forEach(function(cityBlock) {
                cityBlockMap[cityBlock._id] = cityBlock;
            }); */
        
            res.send(roomNumbers);  
          });
    },
    
    
    // consider pre remove middleware!!
    delete : async (req, res, next) => {
        
        const roomNumberId = req.params.id;
        const roomNumber = await RoomNumber.findById(roomNumberId);
        
        if(!Array.isArray(roomNumber.properties) || !roomNumber.properties.length){
            await RoomNumber.findByIdAndRemove(roomNumberId, (err, roomNumber) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(roomNumber);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this room number, there are properties associated with it"});
        } 
    }
}