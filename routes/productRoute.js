const express = require('express');
const passport = require('passport');

const router = express.Router();
const productController = require('../controllers/productController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProductById);

module.exports = router;
