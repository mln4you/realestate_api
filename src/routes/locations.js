const express = require('express');
const router = require('express-promise-router')();
const LocationController = require('../controllers/properties/location');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new location
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), LocationController.create); 

// Update location
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), LocationController.update); 

// Show location
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), LocationController.show); 

// All locations
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), LocationController.all); 

// Delete location
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), LocationController.delete); 

module.exports = router;