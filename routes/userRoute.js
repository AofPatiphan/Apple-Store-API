const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', auth, userController.getMyUserData);
router.patch('/', auth, userController.updateUserData);

module.exports = router;
