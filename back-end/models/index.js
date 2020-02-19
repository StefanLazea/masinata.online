const sequelize = require('./db.js');
const User = sequelize.import('./user');
const Car = sequelize.import('./car');
const Garage = sequelize.import('./garage');
const garagecars = sequelize.import('./garageCars');

Car.belongsToMany(Garage, { through: 'garagecars' });
Garage.belongsToMany(Car, { through: 'garagecars' });

module.exports = {
    User,
    Car,
    Garage,
    garagecars,
    sequelize
}
