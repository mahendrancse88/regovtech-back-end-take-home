const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const stockService = require('./stock.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/', authorize(), addSchema, addStock);
router.get('/', authorize(), getAllStock);
router.get('/unstock/all', authorize(), getAllUnStockList);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        warehouse_id: Joi.string().required(),
        stock: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function addStock(req, res, next) {
    
    stockService.create(req.body)
        .then(() => res.json({ message: 'Warehouse successfully added' }))
        .catch(next);
}

function getAllStock(req, res, next) {
    stockService.getAll()
        .then( stock => res.json(stock))
        .catch(next);
}

function getAllUnStockList(req, res, next) {
    stockService.getunStockAll()
        .then( stock => res.json(stock))
        .catch(next);
}

function getById(req, res, next) {
    stockService.getById(req.params.id)
        .then(stock => res.json(stock))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        warehouse_id: Joi.string().required(),
        stock: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    stockService.update(req.params.id, req.body)
        .then(stock => res.json(stock))
        .catch(next);
}



function _delete(req, res, next) {
    warehouseService.delete(req.params.id)
        .then(() => res.json({ message: 'Warehouse deleted successfully' }))
        .catch(next);
}