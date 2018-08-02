const User = require('../../models/users/user');
const Email = require('../../services/email');
const { signToken , decodeJWT } = require('../../services/jwt-generator');
const { verify_token } = require('../../services/token-generator');
const { mailOptions } = require('../../services/helpers/confirmationEmailOptions');
const UserType = require('../../models/users/user_type');

module.exports = {
    // Sign up method
    signUp : async (req, res, next) => {
        // Email && password
        const { email, lozinka }  = req.value.body;
        // Check is there a user with same email
        const foundUser = await User.findOne({ "local.email" : email });
        // If it is throw new error
        if(foundUser) {
            req.status(422).json({ error :"Email je vec u upotrebi" });
        }
        // If not build email token
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

        // Generate jwt token
        const token = await signToken(newUser);
        
        // Send confirmation email to the new user
        await Email.send(await mailOptions(newUser, emailToken));
        
        // Respond with token
        res.status(200).json({token});
    },
    
    // Sign in method
    signIn : async (req, res, next) => {
        // Generate token
        const token = await signToken(req.user);
        res.status(200).json({token});
    },

    // Some of protected api resources this is just an example that decodes jwt token
    secret : async (req, res, next) => {
        const token = req.headers['authorization']||'';
        res.status(200).json(decodeJWT(token).sub);
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
                    if (err) throw new Error(err.message);
                    return res.status(200).send(user);
                }
            )
        }else{
            req.status(422).json({ error :"Token nije isti !" });
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
                    if (err) throw new Error(err.message);
                }
            );
            
            // Send confirmational Email
            
            await Email.send(await mailOptions(updatedUser, emailToken));
           
            
            // Return success 
            return res.status(200).send(user);
        }else{
            req.status(422).json({ error : "Korisnik nije pronadjen!" });  
        }   
    }
}