const UserType = require('../models/user_type');
const { signToken } = require('../services/jwt-generator');
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
          userType.save(function (err) {

            if (err) return res.status(500).json({err});
          
        return res.status(200).json(userType);
        })
    },
    edit: (req, res, next) => {
        const newUserType = req.body.tip;
        const userTypeId = req.params.id;
        UserType.findByIdAndUpdate(userTypeId, { $set: { tip: newUserType } }, { new: true, runValidators :true}, (err, userType) => {
            if(err){
                console.log(err);
                return res.status(500).json({err});
            }
            return res.status(200).json(userType);
        });
    },
    delete : (req, res, next) => {
        const userTypeId = req.params.id;

        // Make sure in the model to set pre remove middleware to check is some user using this type if it does throw error, else remove
    }
}