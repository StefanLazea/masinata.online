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
            beginDate: Sequelize.DATE,
            expirationDate: Sequelize.DATE,
            companyName: Sequelize.STRING,
            period: Sequelize.STRING,
            cost: Sequelize.INTEGER,
            document: Sequelize.STRING
        },
        {
            underscored: true
        }
    );
}
