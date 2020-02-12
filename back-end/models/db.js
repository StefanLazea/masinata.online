let Sequelize = require('sequelize');
const DB_NAME = require('../configuration.json').name_db;
const DB_USER = require('../configuration.json').user_db;
const DB_PASSWORD = require('../configuration.json').pass_db;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
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