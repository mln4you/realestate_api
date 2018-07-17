const User = require('../models/user');
const Email = require('../services/email');
const { signToken } = require('../services/jwt-generator');
const bcrypt = require('bcryptjs');

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
        date = new Date().getTime();
        stringDate = date.toString();
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const verify_token = await bcrypt.hash(stringDate, salt);

        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                lozinka: lozinka
            },
            verify_token 
        });
        await newUser.save();

        // Generate token
        const token = await signToken(newUser);

        // Send confirmational Email
        let mailOptions = {
            from: 'tester@server.com',
            to: 'test@gmail.com',
            subject: 'Potvrdite email',
            text: 'Plaintext version of the message',
            html: `<p>Kliknite na ovaj <a href='localhost:3000/korisnici/potvrda?token=${verify_token}'>link</a> kako bi ste potvrdili vasu email adresu</p>`
        };
    
        try{
            await Email.send(mailOptions);
        }catch(error){
            return res.status(400).json(error.message);
        }
        
        // Respond with token
        res.status(200).json({token});
    },
    
    // Sign up method
    signIn : async (req, res, next) => {

        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    // Some of protected api resources
    secret : async (req, res, next) => {
        res.status(200).json({secret : "resource"});
    },
    
    // Google oauth method
    googleOath: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    // Facebook oauth method
    facebookOath: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },
    
    // Confirm user
    emailConfirm: async (req, res, next) => {
        let verify_token = req.body.token;
        
        if(req.user.verify_token === verify_token){
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
    } 
}