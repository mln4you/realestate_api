const express = require('express');
const router = require('express-promise-router')();
const FloorNumberController = require('../controllers/properties/floor_number');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new floor number 
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), FloorNumberController.create); 

// Update floor number 
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FloorNumberController.update); 

// Show floor number 
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FloorNumberController.show); 

// All floor number 
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FloorNumberController.all); 

// Delete floor number
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), FloorNumberController.delete); 

module.exports = router;