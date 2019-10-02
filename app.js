const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const employeeRoutes = require('./api/routes/employees');
const userRoutes = require('./api/routes/users');

app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})

module.exports = app;