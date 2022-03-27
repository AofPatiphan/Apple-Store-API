module.exports = (sequelize, Datatypes) => {
    const Category = sequelize.define(
        'Category',
        {
            name: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: {
                name: 'categoryId',
            },
        });
    };

    return Category;
};
