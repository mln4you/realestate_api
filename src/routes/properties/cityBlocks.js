const express = require('express');
const router = require('express-promise-router')();
const CityBlockController = require('../../controllers/properties/city_block');
const {  validateBody, confirmUser, schemas } = require('../../middleware/validateMiddleware');
const passport = require('passport');
const passportConf = require('../../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new city block
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), CityBlockController.create); 

// Update city block
router.route('/edit/:id')
    .put(/* passportJWT, confirmUser(schemas.confirmedSchema), */ CityBlockController.update); 

// Show city block
router.route('/show/:id')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), CityBlockController.show); 

// All city blocks
router.route('/all')
    .get(passportJWT, confirmUser(schemas.confirmedSchema), CityBlockController.all); 

// Delete city block
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), CityBlockController.delete); 

module.exports = router;