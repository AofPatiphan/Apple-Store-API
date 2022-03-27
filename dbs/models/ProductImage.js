module.exports = (sequelize, Datatypes) => {
    const ProductImage = sequelize.define(
        'ProductImage',
        {
            image: {
                type: Datatypes.STRING,
                defaultValue:
                    'https://res.cloudinary.com/dbtlgaii3/image/upload/v1644336153/Gift/Profile_avatar_placeholder_large_tafrpo.png',
            },
        },
        {
            underscored: true,
        }
    );

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
            },
        });
    };

    return ProductImage;
};
