const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const productService = require('./product.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/', authorize(), addSchema, addProduct);
router.get('/', authorize(), getAllProduct);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        category_name: Joi.string().required(),
        brand: Joi.string().min(6).required(),
        sku: Joi.string()
    });
    validateRequest(req, next, schema);
}

function addProduct(req, res, next) {
    
    productService.create(req.body)
        .then(() => res.json({ message: 'Product successfully added' }))
        .catch(next);
}

function getAllProduct(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.products);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(products => res.json(products))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        category_name: Joi.string().required(),
        brand: Joi.string().min(6).required(),
        sku: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}



function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Prdouct deleted successfully' }))
        .catch(next);
}