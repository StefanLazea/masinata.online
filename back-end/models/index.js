const sequelize = require('./db.js');
const User = sequelize.import('./users');
const Car = sequelize.import('./cars');
const Garage = sequelize.import('./garages');
const Paper = sequelize.import('./papers');
const Note = sequelize.import('./notes');

User.hasMany(Car);
Car.belongsTo(User);

Garage.hasOne(Car);
Car.belongsTo(Garage, { foreignKey: { notNull: false } });

User.hasMany(Garage);
Garage.belongsTo(User);
Garage.belongsTo(User, { as: 'admin' });

Car.hasMany(Note);
Note.belongsTo(Car);
Car.hasMany(Paper);
Paper.belongsTo(Car);

module.exports = {
    Car,
    Note,
    User,
    Garage,
    Paper,
    sequelize
}
