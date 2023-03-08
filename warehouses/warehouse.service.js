const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Warehouse.findAll();
}

async function getById(id) {
    return await getWarehouse(id);
}

async function create(params) {
   
    await db.Warehouse.create(params);
}


async function update(id, params) {
    const warehouse = await getWarehouse(id);

    
    // copy params to user and save
    Object.assign(warehouse, params);
    await warehouse.save();

    return omitHash(warehouse.get());
}

async function _delete(id) {
    const warehouse = await getWarehouse(id);
    await warehouse.destroy();
}

// helper functions

async function getWarehouse(id) {
    const warehouse = await db.Warehouse.findByPk(id);
    if (!warehouse) throw 'Warehouse not found';
    return warehouse;
}

function omitHash(warehouse) {
    const { hash, ...warehouseWithoutHash } = warehouse;
    return warehouseWithoutHash;
}