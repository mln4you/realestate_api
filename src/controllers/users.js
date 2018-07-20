const User = require('../models/user');
const Email = require('../services/email');
const { signToken } = require('../services/jwt-generator');
const { verify_token } = require('../services/token-generator');
const { mailOptions } = require('../services/helpers/confirmationEmailOptions');
const UserType = require('../models/user_type');

module.exports = {
    
    // Fill other users data after registration
    fillUserData: async (req, res, next) => {
        
        // Request data
        const data = req.body;

        if(req.user){
            const updatedUser = await User.findById(req.user.id);
            updatedUser.ime = data.ime;
            updatedUser.prezime = data.prezime;
            updatedUser.tip = data.tipId;
            updatedUser.save();
            
            const userType = UserType.findById(data.tipId).populate('User')
                .exec(function (err, tip){
                    if(err) res.status(500).json({error : err.message}); 
                        tip.korisnici.push(updatedUser);
                        tip.save();
                    return res.status(200).send(updatedUser);  
            });
            
        }else{
            return res.status(422).json({error: "user not found"});  
        }
    },

    // Removes specific user
    delete: async (req, res, next) => {
        try{
            const deletedUser = await User.findOne({ email : req.params.email });
            await deletedUser.remove();
            return res.status(200).json({deletedUser});
        }catch(error){
            return res.status(422).send(error.message);
        }     
    },
    // Shows specific user
    user: async (req, res, next) => {
        
        // Find logged in user and load it from db with type relation
        const user = await User.findOne({ "local.email" :req.params.email }).populate('tip')
            .exec(function (err, user){
                
                if(err) res.status(500).json({error : err.message}); 
                
                return res.status(200).send(user);  
            });
    },
    all: async (req, res , next) => {
        try {
            const results = await User.find({});
            return res.status(200).send(results); 
          } catch (err) {
            res.status(500).json({error : err.message}); 
          }
    }   
}