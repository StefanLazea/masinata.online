module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        'email': DataTypes.STRING,
        'password': DataTypes.STRING,
        'createdAt': { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
}