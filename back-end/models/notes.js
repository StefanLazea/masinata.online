let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notes',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            'title': Sequelize.STRING,
            'distance': Sequelize.DOUBLE,
            'description': Sequelize.STRING,
            'createdAt': { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        },
        {
            underscored: true
        }
    );
}
