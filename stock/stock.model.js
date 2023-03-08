const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_id: { type: DataTypes.STRING, allowNull: false },
        warehouse_id: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.STRING, allowNull: false },
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

    return sequelize.define('Stock', attributes, options);
}