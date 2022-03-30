const express = require('express');
const passport = require('passport');

const router = express.Router();
const chargeController = require('../controllers/chargeController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.post('/', auth, chargeController.charge);

module.exports = router;
