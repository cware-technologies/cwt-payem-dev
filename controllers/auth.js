const jwt = require('jsonwebtoken'),
    ExtractJWT = require('passport-jwt').ExtractJwt,
    { secret } = require('../config/jwtSecret.json'),
    models = require('../db/models'),
    Users = models.C_USER,
    Employee = models.C_EMP,
    Organization = models.C_BU,
    Sequelize = require('sequelize'),
    Op = Sequelize.Op,
    crypto = require('crypto'),
    bcrypt = require('bcryptjs')

async function signin(req, res, next) {
    // let views = await getResponsibilityViews(req, res, next)

    const token = jwt.sign(req.jwtPayload, secret, { expiresIn: '1d' })
    res.status(200).json({
        status: 200,
        message: 'Authentication Successful',
        token,
        user_id: req.jwtPayload.id,
        user_name: req.jwtPayload.name,
        redirectURL: '/'
    });
}

function verifyToken(req, res, next){
    let jwtSecret = secret
    let token = ExtractJWT.fromAuthHeaderAsBearerToken()(req)

    jwt.verify(token, jwtSecret, function(err, decoded) {
        if(err){
            res.status(200).json({
                status: 404,
                redirectURL: "/signin"
            })
            // err.status = 400
            // err.redirectURL = "/signin"
            // next(err)
        }
        else(
            res.status(200).json({
                status: 200,
                message: "User Verified Successfuly",
                redirectURL: "/portal/dashboard",
            })
        )
    });
}

module.exports = {
    signin,
}