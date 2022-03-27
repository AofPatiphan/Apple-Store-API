module.exports = (sequelize, Datatypes) => {
    const OrderItem = sequelize.define(
        'OrderItem',
        {
            amount: {
                type: Datatypes.STRING,
            },
            price: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            foreignKey: {
                name: 'orderId',
            },
        });
        OrderItem.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
            },
        });
    };

    return OrderItem;
};
