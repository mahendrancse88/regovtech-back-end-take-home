const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
           // attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
           // withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Warehouse', attributes, options);
}