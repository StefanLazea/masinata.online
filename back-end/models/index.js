const sequelize = require('./db.js');
const User = sequelize.import('./user');
const Car = sequelize.import('./car');
const Garage = sequelize.import('./garage');
const garagecars = sequelize.import('./garageCars');
const carpapers = sequelize.import('./carPapers');
const Paper = sequelize.import('./paper');

Car.belongsToMany(Garage, { through: 'garagecars' });
Garage.belongsToMany(Car, { through: 'garagecars' });

User.hasMany(Car);

Car.belongsToMany(Paper, { through: 'carpapers' });
Paper.belongsToMany(Car, { through: 'carpapers' });


module.exports = {
    User,
    Car,
    Garage,
    garagecars,
    Paper,
    sequelize
}
