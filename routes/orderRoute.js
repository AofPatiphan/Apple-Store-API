const express = require('express');
const passport = require('passport');

const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', auth, orderController.getOrder);
router.post('/', auth, orderController.createOrder);
router.post('/:id', auth, orderController.createOrderItem);
router.delete('/:orderId', auth, orderController.deleteOrder);
router.delete('/orderitem/:itemId', auth, orderController.deleteOrderItem);
router.patch('/:id', auth, orderController.updateOrderItem);

module.exports = router;
