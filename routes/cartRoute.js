const express = require('express');
const passport = require('passport');

const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', auth, cartController.getCart);
router.post('/:id', auth, cartController.createCart);
router.delete('/', auth, cartController.deleteAllCart);
router.delete('/:id', auth, cartController.deleteCart);
router.patch('/:id', auth, cartController.updateCart);

module.exports = router;
