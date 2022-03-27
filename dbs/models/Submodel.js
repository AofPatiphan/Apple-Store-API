module.exports = (sequelize, Datatypes) => {
    const Submodel = sequelize.define(
        'Submodel',
        {
            name: {
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

    Submodel.associate = (models) => {
        Submodel.belongsTo(models.Model, {
            foreignKey: {
                name: 'modelId',
            },
        });
    };

    return Submodel;
};
