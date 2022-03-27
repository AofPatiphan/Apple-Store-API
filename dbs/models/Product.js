module.exports = (sequelize, Datatypes) => {
    const Product = sequelize.define(
        'Product',
        {
            modelName: {
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

    Product.associate = (models) => {
        Product.hasMany(models.Cart, {
            foreignKey: {
                name: 'productId',
            },
        });
        Product.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'productId',
            },
        });
        Product.hasMany(models.ProductImage, {
            foreignKey: {
                name: 'productId',
            },
        });
        Product.hasMany(models.Model, {
            foreignKey: {
                name: 'productId',
            },
        });
        Product.belongsTo(models.Category, {
            foreignKey: {
                name: 'categoryId',
            },
        });
    };

    return Product;
};
