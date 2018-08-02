const express = require('express');
const router = require('express-promise-router')();
const CityController = require('../../controllers/properties/city');
const {  validateBody, confirmUser, schemas } = require('../../middleware/validateMiddleware');
const passport = require('passport');
const passportConf = require('../../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new city 
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), CityController.create); 

// Update city
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), CityController.update); 

// Show city
router.route('/show/:id')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), CityController.show); 

// All city
router.route('/all')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), CityController.all); 

// Delete city
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), CityController.delete); 

module.exports = router;