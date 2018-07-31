const express = require('express');
const router = require('express-promise-router')();
const PropertyTypeController = require('../../controllers/properties/property_type');
const {  validateBody, confirmUser, schemas } = require('../../middleware/validateMiddleware');
const passport = require('passport');
const passportConf = require('../../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new property type
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), PropertyTypeController.create); 

// Update property type
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyTypeController.update); 

// Show property type
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyTypeController.show); 

// All property types
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), PropertyTypeController.all); 

// Delete property type
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), PropertyTypeController.delete); 

module.exports = router;