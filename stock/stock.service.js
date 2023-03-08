const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    getAll,
    getById,
    create,
    update,
    getAllList,
    getunStockAll,
    delete: _delete
};
async function getAllList() {
    return  await db.Stock.findByPk(id);
}

async function getAll() {
    return await db.Stock.findAll({ where:{stock: { [Op.gt] :0} }});
}
async function getunStockAll() {
    return await db.Stock.findAll({ where:{stock: 0 }});
}
async function getById(id) {
    return await getStock(id);
}

async function create(params) {
   
    await db.Stock.create(params);
}


async function update(id, params) {
    const stock = await getStock(id);

    
    // copy params to user and save
    Object.assign(stock, params);
    await stock.save();

    return omitHash(stock.get());
}

async function _delete(id) {
    const stock = await getStock(id);
    await stock.destroy();
}

// helper functions

async function getStock(id) {
    const stock = await db.Stock.findByPk(id);
    if (!stock) throw 'Stock not found';
    return stock;
}

function omitHash(stock) {
    const { hash, ...stockWithoutHash } = stock;
    return stockWithoutHash;
}