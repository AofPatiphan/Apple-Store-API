const express = require('express');
const authRoute = require('./routes/authRoute');

// // Create Table
const { sequelize } = require('./dbs/models/index');
sequelize.sync({ force: false });

require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);

app.use('/auth', authRoute);

app.use('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello' });
});

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    if (err.name === 'JsonWebTokenError') {
        code = 401;
    }
    if (err.name === 'TokenExpiredError') {
        code = 401;
    }
    if (process.env.NODE_ENV === 'development') {
        res.status(code).json({ message: err.message });
    } else {
        res.status(code.json({ message: 'something wrong' }));
    }
});

const jwt = require('jsonwebtoken');
const http = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () =>
    console.log(`server run on port ${process.env.PORT}`)
);
