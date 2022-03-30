const jwt = require('jsonwebtoken');

const omise = require('omise')({
    secretKey: process.env.SECRET_KEY_OMISE,
    publicKey: process.env.PUBLIC_KEY_OMISE,
});

exports.charge = async (req, res, next) => {
    try {
        const { email, card, amount } = req.body;
        const customers = await omise.customers.create({
            email,
            description: 'test user',
            card,
        });
        const charge = await omise.charges.create({
            amount,
            currency: 'thb',
            customer: customers.id,
        });
        res.status(200).json({ charge });
    } catch (err) {
        next(err);
    }
};
