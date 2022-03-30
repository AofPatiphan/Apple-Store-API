const jwt = require('jsonwebtoken');
const { Order, OrderItem, Product } = require('../dbs/models/index');

exports.getOrder = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: OrderItem,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            model: Product,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
            ],
        });
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const { status } = req.body;
        const newOrder = await Order.create({
            status,
            userId: req.user.id,
        });

        res.status(200).json({ newOrder });
    } catch (err) {
        next(err);
    }
};

exports.createOrderItem = async (req, res, next) => {
    try {
        const { productId, price, amount } = req.body;
        const { id } = req.params;
        await OrderItem.create({
            orderId: id,
            productId,
            price,
            amount,
        });
        res.status(200).json({ message: 'Create order success' });
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        await OrderItem.destroy({ where: { orderId } });
        await Order.destroy({
            where: { id: orderId },
        });
        res.status(200).json({ message: 'Delete order successful' });
    } catch (err) {
        next(err);
    }
};

exports.deleteOrderItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        await OrderItem.destroy({ where: { id: itemId } });
        res.status(200).json({ message: 'Delete orderItem successful' });
    } catch (err) {
        next(err);
    }
};

exports.updateOrderItem = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
