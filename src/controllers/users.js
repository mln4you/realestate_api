const User = require('../models/user');
const Email = require('../services/email');
const { signToken } = require('../services/jwt-generator');
const { verify_token } = require('../services/token-generator');
const { mailOptions } = require('../services/helpers/confirmationEmailOptions');

module.exports = {
    
    // Sign in method
    signUp : async (req, res, next) => {
        
        // Email && password
        const { email, lozinka }  = req.value.body;
        // Check is there a user with same email
        const foundUser = await User.findOne({ "local.email" : email });
        if(foundUser) {
            return res.status(403).json({error: "Email je vec u upotrebi"});
        }
        
        const emailToken = await verify_token();

        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                lozinka: lozinka
            },
            verify_token : emailToken
        });
        await newUser.save();

        // Generate token
        const token = await signToken(newUser);
        try{
            await Email.send(await mailOptions(newUser, emailToken));
        }catch(error){
            return res.status(400).json(error.message);
        }
        
        // Respond with token
        res.status(200).json({token});
    },
    
    // Sign up method
    signIn : async (req, res, next) => {

        // Generate token
        const token = await signToken(req.user);
        res.status(200).json({token});
    },

    // Some of protected api resources
    secret : async (req, res, next) => {
        res.status(200).json({secret : "resource"});
    },
    
    // Google oauth method
    googleOath: async (req, res, next) => {
        // Generate token
        const token = await signToken(req.user);
        res.status(200).json({token});
    },

    // Facebook oauth method
    facebookOath: async (req, res, next) => {
        // Generate token
        const token = await signToken(req.user);
        res.status(200).json({token});
    },
    
    // Email confirmation 
    emailConfirm: async (req, res, next) => {
        let token = req.body.token;
        
        if(req.user.verify_token === token){
            await User.findByIdAndUpdate(  

                // the id of the item to find
                req.user.id,
            
                // the change to be made. Mongoose will smartly combine your existing 
                // document with this change, which allows for partial updates too
                { "status" : true },
            
                // an option that asks mongoose to return the updated version 
                // of the document instead of the pre-updated one.
                {new: true},
            
                // the callback function
                (err, user) => {
                // Handle any possible database errors
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(user);
                }
            )
        }else{
            return res.status(422).json({"error": "Token se ne podudara !"});
        }
    },

    // Resend email with token
    emailConfirmResend: async (req, res, next) => {
        const token = await verify_token();
        
        if(req.user){
            const updatedUser = await User.findByIdAndUpdate(  

                // the id of the item to find
                req.user.id,
            
                // the change to be made. Mongoose will smartly combine your existing 
                // document with this change, which allows for partial updates too
                { "verify_token" : token },
            
                // an option that asks mongoose to return the updated version 
                // of the document instead of the pre-updated one.
                {new: true},
            
                // the callback function
                (err, user) => {
                // Handle any possible database errors
                    if (err) return res.status(500).send(err);  
                }
            );
            
            // Send confirmational Email
            try{
                Email.send(await mailOptions(updatedUser, emailToken));
            }catch(error){
                return res.status(400).json(error.message);
            }
            
            // Return success 
            return res.status(200).send(user);
        }else{
            return res.status(422).json({error: "user not found"});     
        }   
    },
    // Fill other users data
    fillUserData: async (req, res, next) => {
        
        // Request data
        const data = req.body;

        if(req.user){
            const updatedUser = await User.findByIdAndUpdate(  

                // the id of the item to find
                req.user.id,
            
                // the change to be made. Mongoose will smartly combine your existing 
                // document with this change, which allows for partial updates too
                { 
                    "ime": data.ime ,
                    "prezime" : data.prezime
                },
            
                // an option that asks mongoose to return the updated version 
                // of the document instead of the pre-updated one.
                {new: true},
            
                // the callback function
                (err, user) => {
                // Handle any possible database errors
                    if (err) return res.status(500).json({error : err.message});  
                    return res.status(200).send(user);
                }
            );
        }else{
            return res.status(422).json({error: "user not found"});  
        }
    }   
}