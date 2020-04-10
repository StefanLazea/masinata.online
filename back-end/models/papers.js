let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('papers',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            type: Sequelize.STRING,
            details: Sequelize.STRING,
            expirationDate: Sequelize.DATE,
            period: Sequelize.STRING,
            cost: Sequelize.INTEGER
        },
        {
            underscored: true
        }
    );
}
