let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            'email': DataTypes.STRING,
            'password': DataTypes.STRING,
            'role': DataTypes.STRING,
            'lastname': DataTypes.STRING,
            'firstname': DataTypes.STRING,
            'address': DataTypes.STRING,
            'secondAddress': DataTypes.STRING,
            'phone': DataTypes.STRING,
            'createdAt': { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        },
        {
            underscored: true
        }
    );
}