let Sequelize = require('sequelize');
// const Car = sequelize.import('./car');
// const Garage = sequelize.import('./garage');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('garagecars',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            car_id: {
                type: Sequelize.UUID,
                references: {
                    model: sequelize.import('./car'), // 'Movies' would also work
                    key: 'id'
                }
            },
            garage_id: {
                type: Sequelize.UUID,
                references: {
                    model: sequelize.import('./garage'), // 'Actors' would also work
                    key: 'id'
                }
            }
        },
        {
            underscored: true
        });
}
