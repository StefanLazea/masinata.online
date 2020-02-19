let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('garages',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            name: Sequelize.STRING
        },
        {
            underscored: true
        }
    );
}
