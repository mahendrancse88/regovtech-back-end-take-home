const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const warehouseService = require('./warehouse.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/', authorize(), addSchema, addWarehouse);
router.get('/', authorize(), getAllWarehouse);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string()
    });
    validateRequest(req, next, schema);
}

function addWarehouse(req, res, next) {
    
    warehouseService.create(req.body)
        .then(() => res.json({ message: 'Warehouse successfully added' }))
        .catch(next);
}

function getAllWarehouse(req, res, next) {
    warehouseService.getAll()
        .then( warehouses => res.json(warehouses))
        .catch(next);
}


function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(warehouses => res.json(warehouses))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    warehouseService.update(req.params.id, req.body)
        .then(warehouse => res.json(warehouse))
        .catch(next);
}



function _delete(req, res, next) {
    warehouseService.delete(req.params.id)
        .then(() => res.json({ message: 'Warehouse deleted successfully' }))
        .catch(next);
}