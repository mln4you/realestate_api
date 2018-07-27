const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users/users');
const { validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportSignIn = passport.authenticate('local', { session : false });
const passportJWT = passport.authenticate('jwt', { session: false });

    // Fill user data 
    // Consider first middleware confirmUser
router.route('/fillUserData')
    .put(passportJWT, validateBody(schemas.userDataSchema), UsersController.fillUserData);

    // Delete user
router.route('/delete/:email')
    .delete(passportJWT , confirmUser(schemas.confirmedSchema), UsersController.delete);

    // Show specific user
router.route('/user/:email')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), UsersController.user);

    // Show specific user
router.route('/all')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), UsersController.all);

module.exports = router;

