const User = require('../models/user');
const email = require('../services/email');
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
        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
                email : email,
                lozinka : lozinka
            }
        });
        await newUser.save();

        // Generate token
        const token = signToken(newUser);
        
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const idHash = await bcrypt.hash(newUser.id, salt);

        // Send confirmational Email
        let mailOptions = {
            from: 'tester@server.com',
            to: newUser.email,
            subject: 'Potvrdite email',
            text: 'Plaintext version of the message',
            html: `<p>Kliknite na ovaj <a href="localhost:3000/confirm?id=${idHash}>link</a> kako bi ste potvrdili vasu email adresu</p>`
        };
        try{
            await email.send(mailOptions);
        }catch(error){
            return res.status(400).json(error);
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
        
        console.log(req.body);
        res.status(200).json("test");
    } 
}