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
            profileUrl: {
                type: Datatypes.STRING,
            },
            role: {
                type: Datatypes.ENUM('user', 'admin'),
            },
        },
        {
            underscored: true,
        }
    );

    return User;
};
