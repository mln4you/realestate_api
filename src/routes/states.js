const express = require('express');
const router = require('express-promise-router')();
const StateController = require('../controllers/properties/state');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new state
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), StateController.create); 

// Update state
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), StateController.update); 

// Show state
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), StateController.show); 

// All states
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), StateController.all); 

// Delete state
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), StateController.delete); 

module.exports = router;