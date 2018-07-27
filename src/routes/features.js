const express = require('express');
const router = require('express-promise-router')();
const FeatureController = require('../controllers/properties/feature');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new feature 
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), FeatureController.create); 

// Update feature
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FeatureController.update); 

// Show feature
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FeatureController.show); 

// All feature
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), FeatureController.all); 

// Delete feature
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), FeatureController.delete); 

module.exports = router;