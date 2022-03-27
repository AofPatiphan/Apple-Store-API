const jwt = require('jsonwebtoken');
const {
    Product,
    ProductImage,
    Model,
    Submodel,
    Category,
    OrderItem,
} = require('../dbs/models/index');

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    // where: {  },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },

                {
                    model: Model,

                    include: [
                        {
                            model: Submodel,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Category,
                    // where: {  },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: OrderItem,
                    // where: {  },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};
exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [
                {
                    model: ProductImage,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },

                {
                    model: Model,

                    include: [
                        {
                            model: Submodel,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: OrderItem,
                    // where: {  },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};
