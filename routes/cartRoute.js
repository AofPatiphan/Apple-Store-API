const express = require('express');
const passport = require('passport');

const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/:id', auth, cartController.getCartById);
router.post('/:id', auth, cartController.createCart);
router.delete('/', auth, cartController.deleteCart);

module.exports = router;
