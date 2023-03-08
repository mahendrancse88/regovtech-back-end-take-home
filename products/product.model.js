const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        category_name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        sku: { type: DataTypes.STRING, allowNull: false },
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

    return sequelize.define('Product', attributes, options);
}