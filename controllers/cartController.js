const { Cart, Product, ProductImage } = require('../dbs/models/index');

exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findAll({
            where: { userId: req.user.id },
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
            order: [['id', 'DESC']],
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

exports.deleteAllCart = async (req, res, next) => {
    try {
        const result = await Cart.destroy({
            where: {
                userId: req.user.id,
            },
        });
        if (result === 0) {
            res.status(400).json({ message: 'cannot delete cart' });
        }
        res.status(204).json();
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
            res.status(400).json({ message: 'cannot delete cart' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const { id } = req.params;
        await Cart.update(
            {
                amount,
            },
            {
                where: {
                    id,
                },
            }
        );
        res.send({ message: 'updated done' });
    } catch (err) {
        next(err);
    }
};
