module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define(
        'User',
        {
            firstName: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Datatypes.STRING,
            },
            role: {
                type: Datatypes.STRING,
                defaultValue: 'user',
            },
            address: {
                type: Datatypes.TEXT,
            },
            phoneNumber: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.hasOne(models.Cart, {
            foreignKey: {
                name: 'userId',
            },
        });

        User.hasMany(models.Order, {
            foreignKey: {
                name: 'userId',
            },
        });
    };

    return User;
};
