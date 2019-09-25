const authRoutes = require('./auth');
module.exports = function(app, db) {
    app.use('/auth', authRoutes)
}