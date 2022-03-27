module.exports = (sequelize, Datatypes) => {
    const Order = sequelize.define(
        'Order',
        {
            status: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });
        Order.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'orderId',
            },
        });
    };

    return Order;
};
