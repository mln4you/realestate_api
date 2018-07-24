const UserRole = require('../models/user_role');
const User = require('../models/user');
const { signToken } = require('../services/jwt-generator');
const mongoose = require('mongoose');


module.exports = {
    // Creates new user type
    create: async (req, res, next) => {
        // Create new user type form request object
        const uloga  = req.body.uloga;
        var userRole = new UserRole({
            _id: new mongoose.Types.ObjectId(),
            uloga: uloga,
          });
          // Save user type
          userRole.save(function (err) {

            if (err) return res.status(500).json({err});
          
        return res.status(200).json(userRole);
        })
    },
    edit: (req, res, next) => {
        const newUserRole = req.body.uloga;
        const userRoleId = req.params.id;
        UserRole.findByIdAndUpdate(userRoleId, { $set: { uloga: newUserRole } }, { new: true, runValidators :true}, (err, userRole) => {
            if(err){
                console.log(err);
                return res.status(500).json({err});
            }
            return res.status(200).json(userRole);
        });
    },
    delete : async (req, res, next) => {
        const userRoleId = req.params.id;
        const userRole = await UserRole.findById(userRoleId);
        
        if(!Array.isArray(userRole.korisnici) || !userRole.korisnici.length){
            await UserRole.findByIdAndRemove(userRoleId, (err, uloga) => {
                if(err){
                    return res.status(500).json(err.message);
                }
                return res.status(200).json(uloga);
            });
        }else{
            return res.status(500).json({error: "Cannot delete this user role, there are users associated with it"});
        } 
    }
}