const jwt = require('jsonwebtoken');
const { Cart, Product, ProductImage } = require('../dbs/models/index');

exports.getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne({
            where: { id },
            include: [
                {
                    model: Product,

                    include: [
                        {
                            model: ProductImage,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        res.status(200).json({ cart });
    } catch (err) {
        next(err);
    }
};
exports.createCart = async (req, res, next) => {
    try {
        const { amount, price } = req.body;
        const { id } = req.params;

        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }
        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const newCart = await Cart.create({
            amount,
            price,
            productId: id,
            userId: req.user.id,
        });

        res.status(200).json({ newCart });
    } catch (err) {
        next(err);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Cart.destroy({
            where: {
                id,
            },
        });
        if (result === 0) {
            res.status(400).json({ message: 'cannot delete todo' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
