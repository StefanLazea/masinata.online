let Sequelize = require('sequelize');
const user = require('../configuration.json').user_db;
const password = require('../configuration.json').user_pass;

const sequelize = new Sequelize(
    'my-cars',
    user,
    password,
    {
        dialect: 'mysql',
        host: 'localhost',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;