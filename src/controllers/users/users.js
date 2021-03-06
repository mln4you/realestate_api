const User = require('../../models/user');
const Email = require('../../services/email');
const { signToken } = require('../../services/jwt-generator');
const { verify_token } = require('../../services/token-generator');
const { mailOptions } = require('../../services/helpers/confirmationEmailOptions');
const UserType = require('../../models/user_type');
const UserRole = require('../../models/user_role');

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
            updatedUser.uloga = data.ulogaId;
            updatedUser.save();
            
            UserType.findById(data.tipId).populate('User')
                .exec(function (err, tip){
                    if(err) res.status(500).json({error : err.message}); 
                        tip.korisnici.push(updatedUser);
                        tip.save();
            });
            UserRole.findById(data.ulogaId).populate('User')
                .exec(function (err, uloga){
                    if(err) res.status(500).json({error : err.message}); 
                        uloga.korisnici.push(updatedUser);
                        uloga.save();
            });
            return res.status(200).send(updatedUser); 
        }else{
            return res.status(422).json({error: "user not found"});  
        }
    },

    // Removes specific user
    delete: async (req, res, next) => {

        // try with middleware
        const user = await User.findOne({ "local.email" : req.params.email });
        if(!user){
            return res.status(422).json({error: "user not found"});     
        }
        return await user.remove(function(err,user){
            if(!err) {
                return res.status(200).send(user);
            } else {
                return res.status(422).json({error: err.message});                                
            }
        return res.status(200).send(user);
    
        })
    },
    // Shows specific user
    user: async (req, res, next) => {
        
        // Find logged in user and load it from db with type relation
        const user = await User.findOne({ "local.email" :req.params.email }).populate('tip')
            .populate('uloga')
            .exec(function (err, user){
                if(err) res.status(500).json({error : err.message}); 
            });
            if(user){
                return res.status(200).send(user);  
            }else{
                if(err) res.status(500).json({error: "user not found"});  
            }
            
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