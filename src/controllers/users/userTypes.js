const UserType = require('../../models/users/user_type');
const User = require('../../models/users/user');
const { signToken } = require('../../services/jwt-generator');
const mongoose = require('mongoose');


module.exports = {
    // Creates new user type
    create: async (req, res, next) => {
        // Create new user type form request object
        const tip  = req.body.tip;
        var userType = new UserType({
            _id: new mongoose.Types.ObjectId(),
            tip: tip,
          });
          // Save user type
          await userType.save(function (err) {

            if (err) throw new Error(err.message);
          
        return res.status(200).json(userType);
        })
    },
    
    edit: (req, res, next) => {
        const newUserType = req.body.tip;
        const userTypeId = req.params.id;
        UserType.findByIdAndUpdate(userTypeId, { $set: { tip: newUserType } }, { new: true, runValidators :true}, (err, userType) => {
            if(err){
                throw new Error(err.message);
            }
            return res.status(200).json(userType);
        });
    },
    
    delete : async (req, res, next) => {
        const userTypeId = req.params.id;
        const userType = await UserType.findById(userTypeId);
        
        if(!Array.isArray(userType.korisnici) || !userType.korisnici.length){
            await UserType.findByIdAndRemove(userTypeId, (err, type) => {
                if(err){
                    throw new Error(err.message);
                }
                return res.status(200).json(type);
            });
        }else{
            throw new Error("Cannot delete this user type, there are users associated with it");
        } 
    }
}