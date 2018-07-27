const express = require('express');
const router = require('express-promise-router')();
const PropertyController = require('../controllers/properties/properties');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new property 
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), PropertyController.create); 

// Update property
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyController.update); 

// Show property
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyController.show); 

// All properties
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyController.all); 

// Delete property
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), PropertyController.delete); 

module.exports = router;