const express = require('express');
const router = require('express-promise-router')();
const RoomNumberController = require('../../controllers/properties/room_number');
const {  validateBody, confirmUser, schemas } = require('../../middleware/validateMiddleware');
const passport = require('passport');
const passportConf = require('../../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new room number
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), RoomNumberController.create); 

// Update room number
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), RoomNumberController.update); 

// Show room number
router.route('/show/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), RoomNumberController.show); 

// All room number
router.route('/all')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), RoomNumberController.all); 

// Delete room number
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), RoomNumberController.delete); 

module.exports = router;