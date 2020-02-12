const sequelize = require('./db.js');
const Users = sequelize.import('./users');

module.exports = {
    Users,
    sequelize
}
