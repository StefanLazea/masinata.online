let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carpapers',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            car_id: {
                type: Sequelize.UUID,
                references: {
                    model: sequelize.import('./car'),
                    key: 'id'
                }
            },
            paper_id: {
                type: Sequelize.UUID,
                references: {
                    model: sequelize.import('./paper'),
                    key: 'id'
                }
            }
        },
        {
            underscored: true
        });
}
