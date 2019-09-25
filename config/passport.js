const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize,
    models = require('../db/models'),
    User = models.C_USER,
    bcrypt = require('bcryptjs'),
    debug = require('debug')('passport'),
    { secret } = require('../config/jwtSecret.json');

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'login',
            passwordField: 'hash_pwd',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            try {
                User.findOne({
                    where: {
                        login: username,
                    },
                }).then(user => {
                    if (user !== null) {
                        let err = new Error('Username already taken')
                        err.status = 401
                        req.errorMessage = err
                        return done(null, false, { message: 'Username already taken' });
                    }
                    else {
                        let user = req.body
                        let contractExpiry = null
                        let date = new Date(user.ATTRIB_18)
                        contractExpiry = new Date(date.setMonth(date.getMonth() + 12));

                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

                            return sequelize.transaction(t => {
                                return User.create({
                                    login: username,
                                    hash_pwd: hashedPassword,
                                    emp_id: emp.row_id,
                                    resp_id: user.resp_id.value,
                                    bu_id: user.bu_id.value,
                                    div_id: user.div_id.value,
                                    fst_name: user.fst_name,
                                    last_name: user.last_name,
                                }, { transaction: t });

                            }).then(result => {
                                debug("User Created");
                                req.currentUsername = username
                                return done(null, result)
                            }).catch(err => {
                                done(err);
                            });
                        })
                    }
                })
            }
            catch (err) {
                done(err);
            }
        }
    )
)
passport.use(
    'signin',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            try {
                User.findOne({
                    where: {
                        login: username,
                    },
                }).then(user => {
                    if (user === null) {
                        let err = new Error('Username Or Password Is Wrong.')
                        err.status = 401
                        req.errorMessage = err
                        return done(null, false, { message: 'Username Or Password Is Wrong.' });
                    } else {
                        bcrypt.compare(password, user.hash_pwd).then(response => {
                            if (response !== true) {
                                let err = new Error('Username Or Password Is Wrong.')
                                err.status = 401
                                req.errorMessage = err
                                return done(null, false, { message: 'Username Or Password Is Wrong.' });
                            }
                            // note the return needed with passport local - remove this return for passport JWT
                            req.jwtPayload = {
                                id: user.emp_id,
                                username: user.login,
                                name: user.fst_name + " " + user.last_name,
                                responsibility: user.resp_id,
                                organization: user.bu_id,
                            }

                            return done(null, user);

                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

passport.use(
    'jwt',
    new JWTStrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    login: jwt_payload.username,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    // note the return removed with passport JWT - add this return for passport local
                    return done(null, user);
                } else {
                    console.log('user not found in db');
                    let err = new Error('Sign in Again')
                    err.status = 401
                    return done(null, false, err);
                }
            });
        } catch (err) {
            return done(err);
        }
    }),
);