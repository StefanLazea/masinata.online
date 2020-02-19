let Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cars',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            model: Sequelize.STRING,
            brand: Sequelize.STRING,
            type: Sequelize.STRING,
            licence_plate: Sequelize.STRING,
            vin: Sequelize.STRING,
            engine_type: Sequelize.STRING,
            year: Sequelize.INTEGER,
            eco: Sequelize.STRING
        },
        {
            underscored: true
        }
    );
}
