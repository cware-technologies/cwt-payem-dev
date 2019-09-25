const router = require('express').Router();
const { authController } = require('../controllers')
const passport = require('passport')

router.post('/signin', passport.authenticate('signin', { failWithError: true, session: false }),
    function(req, res, next) {
        // Handle success
        next();
    },
    function(err, req, res, next) {
        // Handle error
        if(req.errorMessage){
            let err = req.errorMessage;
            return next(err);
        }
        return next(err);
    },
    authController.signin
);

module.exports = router;