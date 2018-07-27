const express = require('express');
const router = require('express-promise-router')();
const AuthController = require('../controllers/users/auth');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportSignIn = passport.authenticate('local', { session : false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', {session : false});
const passportFacebook = passport.authenticate('facebookToken', {session : false});

// Register user localy
router.route('/signup')
    .post(validateBody(schemas.authSchema), AuthController.signUp); 

// Login user localy
router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, AuthController.signIn);

// Example resource user localy
router.route('/secret')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), AuthController.secret);

// Register user with Google
router.route('/oauth/google')
    .post(passportGoogle, AuthController.googleOath);
    
// Register user with Facebook
router.route('/oauth/facebook')
    .post(passportFacebook, AuthController.facebookOath);

// Email confirm
router.route('/emailConfirm')
    .post(passportJWT, AuthController.emailConfirm);
    
// Resend email confirmation token
router.route('/emailConfirmResend')
        .post(passportJWT, AuthController.emailConfirmResend);

module.exports = router;