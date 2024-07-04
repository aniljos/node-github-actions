const express = require('express');
const bodyParser = require('body-parser');
const { Product } = require('../model/product');


const { Router } = express;
const productsRouter = Router();

productsRouter.use(bodyParser.json());

const products = [
    new Product(1, 'Product 1', 10, 'Description 1'),
    new Product(2, 'Product 2', 20, 'Description 2'),
    new Product(3, 'Product 3', 30, 'Description 3'),
    new Product(4, 'Product 4', 40, 'Description 4'),
    new Product(5, 'Product 5', 50, 'Description 5'),
    new Product(6, 'Product 6', 60, 'Description 6'),
    new Product(7, 'Product 7', 70, 'Description 7'),
    new Product(8, 'Product 8', 80, 'Description 8'),
    new Product(9, 'Product 9', 90, 'Description 9'),
    new Product(10, 'Product 10', 100, 'Description 10')
];

productsRouter.get('/', (req, res) => {
    res.json(products);
});

productsRouter.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);

    if (!product) {
        res.status(400).send('Product not found');
    }

    res.json(product);
});
productsRouter.post('/', (req, res) => {
    
    if (!req.body.name || !req.body.price || !req.body.description) {
        res.status(400).send();
    }
    const product = req.body;
    products.push(product);
    res.status(201).json(product);
}) 
productsRouter.delete('/:id', (req, res) => {

    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        res.status(404).send();
    }
    products.splice(index, 1);
    res.status(204).send();
})

module.exports = {
    productsRouter
}