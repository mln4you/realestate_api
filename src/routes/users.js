const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportSignIn = passport.authenticate('local', { session : false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', {session : false});
const passportFacebook = passport.authenticate('facebookToken', {session : false});

// Register user localy
router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp); 

// Login user localy
router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

// Example resource user localy
router.route('/secret')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), UsersController.secret);

// Register user with Google
router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOath);
    
// Register user with Facebook
router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOath);

    // Email confirm
router.route('/emailConfirm')
.post(passportJWT, UsersController.emailConfirm);

    // Resend email confirmation token
router.route('/emailConfirmResend')
    .post(passportJWT, UsersController.emailConfirmResend);

    // Resend email confirmation token
    //Consider incuding confirmUser middleware
router.route('/fillUserData')
    .post(passportJWT, validateBody(schemas.userData), UsersController.fillUserData);

module.exports = router;

