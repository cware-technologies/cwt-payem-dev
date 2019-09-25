const mysql = require('mysql');
const Sequelize = require('sequelize');

let user = process.env.MYSQL_USERNAME || "root"
let password = process.env.MYSQL_PASSWORD || "abc123"

function connectMySQL() {
    return new Promise((resolve, reject) => {
        const sequelize = new Sequelize('PAYEM', user, password, {
            host: 'localhost',
            dialect: 'mysql',
            define: {
                freezeTableName: true
            },
            logging: false
        });

        sequelize.authenticate()
        .then(() => resolve(sequelize))
        .catch((err) => reject(`MySQL Connection Failed Error: ${err}`))
    })
}

module.exports = {
    connectMySQL,
}