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
    }


}