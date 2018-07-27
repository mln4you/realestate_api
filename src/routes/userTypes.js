const express = require('express');
const router = require('express-promise-router')();
const UserTypesController = require('../controllers/users/userTypes');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new user type
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), UserTypesController.create); 

// Edit user type
router.route('/edit/:id')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), UserTypesController.edit); 

// Delete user type
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), UserTypesController.delete); 

module.exports = router;