const UserType = require('../models/user_type');
const { signToken } = require('../services/jwt-generator');


module.exports = {
    // Creates new user type
    create: async (req, res, next) => {
        // User type
        const tip  = req.body.tip;
        const userType = new UserType.create({
            tip : tip
        });
        await userType.save();
        return res.status(200).json(userType);
    }
}