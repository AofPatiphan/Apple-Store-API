module.exports = (sequelize, Datatypes) => {
    const Model = sequelize.define(
        'Model',
        {
            name: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Model.associate = (models) => {
        Model.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
            },
        });
        Model.hasMany(models.Submodel, {
            foreignKey: {
                name: 'modelId',
            },
        });
    };

    return Model;
};
