const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const {  validateBody, schemas } = require('../services/helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportSignIn = passport.authenticate('local', { session : false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', {session : false});
const passportFacebook = passport.authenticate('facebookToken', {session : false});

// Register user localy
router.route('/registracija')
    .post(validateBody(schemas.authSchema), UsersController.signUp); 

// Login user localy
router.route('/login')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

// Example resource user localy
router.route('/secret')
    .get(passportJWT, UsersController.secret);

// Register user with Google
router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOath);
    
// Register user with Facebook
router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOath);

    // Email confirm
router.route('/podaci')
.get(UsersController.emailConfirm);

module.exports = router;