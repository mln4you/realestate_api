const express = require('express');
const router = require('express-promise-router')();
const HeatingTypeController = require('../controllers/properties/heating_type');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new heating type 
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), HeatingTypeController.create); 

// Update heating type 
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), HeatingTypeController.update); 

// Show heating type 
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), HeatingTypeController.show); 

// All heating type 
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), HeatingTypeController.all); 

// Delete heating type
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), HeatingTypeController.delete); 

module.exports = router;