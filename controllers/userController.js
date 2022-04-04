const jwt = require('jsonwebtoken');
const { User } = require('../dbs/models/index');

exports.getMyUserData = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
            },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.updateUserData = async (req, res, next) => {
    try {
        const { address, phoneNumber } = req.body;
        const [affectedRow] = await User.update(
            {
                address,
                phoneNumber,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update todo' });
        }

        const user = await User.findOne({ where: { id: req.user.id } });

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
