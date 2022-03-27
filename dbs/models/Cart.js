module.exports = (sequelize, Datatypes) => {
    const Cart = sequelize.define(
        'Cart',
        {
            amount: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });
        Cart.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
            },
        });
    };

    return Cart;
};
