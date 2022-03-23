const { User } = require('../dbs/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;

        if (firstName === '')
            return res.status(400).json({ message: 'firstname is require' });

        if (lastName === '')
            return res.status(400).json({ message: 'lastname is require' });

        if (email === '')
            return res.status(400).json({ message: 'email is require' });

        if (password === '' || password === null || password === undefined)
            return res.status(400).json({ message: 'Please input password' });

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password is too short' });
        }
        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Password is not match' });

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) {
            return res.status(400).json({ message: 'email is already in use' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashed,
        });

        const myUser = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        res.status(200).json({ myUser });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ message: 'email is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'password is incorrect' });
        }

        // jwt
        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.json({ message: 'Login success', token });
    } catch (err) {
        next(err);
    }
};
exports.loginFb = async (req, res, next) => {
    try {
        const { response } = req.body;
        const email = response._tokenResponse.email;
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            console.log(1);
            const newUser = await User.create({
                firstName: response._tokenResponse.firstName,
                lastName: response._tokenResponse.lastName,
                email: response._tokenResponse.email,
                role: 'user',
            });
            console.log(2);
            const payload = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            };
            console.log(3);
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: 60 * 60 * 24 * 30,
            });
            console.log(4);
            return res.json({ message: 'Login success', token });
        }
        console.log(5);

        // jwt
        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            role: user.role,
        };
        console.log(6);
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        res.json({ message: 'Login success', token });
    } catch (err) {
        next(err);
    }
};
