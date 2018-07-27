const express = require('express');
const router = require('express-promise-router')();
const UserRolesController = require('../controllers/users/userRoles');
const {  validateBody, confirmUser, schemas } = require('../services/helpers/validateMiddleware');
const passport = require('passport');
const passportConf = require('../services/passport/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// Create new user type
router.route('/create')
    .post(passportJWT, confirmUser(schemas.confirmedSchema), UserRolesController.create); 

// Edit user type
router.route('/edit/:id')
    .put(passportJWT, confirmUser(schemas.confirmedSchema), UserRolesController.edit); 

// Delete user type
router.route('/delete/:id')
    .delete(passportJWT, confirmUser(schemas.confirmedSchema), UserRolesController.delete); 

module.exports = router;