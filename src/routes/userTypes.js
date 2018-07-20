const express = require('express');
const router = require('express-promise-router')();
const UserTypesController = require('../controllers/userTypes');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new user type
router.route('/create')
    .post(passportJWT, UserTypesController.create); 

router.route('/edit')
    .post(passportJWT, UserTypesController.create); 

module.exports = router;