const sequelize = require('./db.js');
const User = sequelize.import('./users');
const Car = sequelize.import('./cars');
const Garage = sequelize.import('./garages');
const Paper = sequelize.import('./papers');
const Note = sequelize.import('./notes');

User.hasMany(Car);
Garage.hasOne(Car);

Car.hasMany(Note);
Car.hasMany(Paper);

User.hasMany(Car);

module.exports = {
    User,
    Garage,
    Paper,
    sequelize
}
