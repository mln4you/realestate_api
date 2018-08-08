const express = require('express');
const router = require('express-promise-router')();
const PropertyForController = require('../../controllers/properties/property_for');
const {  validateBody, confirmUser, schemas } = require('../../middleware/validateMiddleware');
const passport = require('passport');
const passportConf = require('../../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new property for
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), PropertyForController.create); 

// Update property for
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyForController.update); 

// Show property for
router.route('/show/:id')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), PropertyForController.show); 

// All properties for
router.route('/all')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), PropertyForController.all); 

// Delete property for
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), PropertyForController.delete); 

module.exports = router;