// __tests__/productsRouter.test.js
const request = require('supertest');
const express = require('express');
const { productsRouter } = require('../controllers/product-controller');
const { Product } = require('../model/product');

const app = express();
app.use('/products', productsRouter);

describe('GET /products', () => {
  test('should respond with a list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(10); // Adjust this based on your initial data
  });
});

describe('GET /products/:id', () => {
  test('should respond with a product if found', async () => {
    const response = await request(app).get('/products/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('should respond with 404 if product not found', async () => {
    const response = await request(app).get('/products/999');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Product not found');
  });
});

describe('POST /products', () => {
  test('should create a new product', async () => {
    const newProduct = new Product(11, 'Product 11', 110, 'Description 11');
    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });

  test('should respond with 400 if required fields are missing', async () => {
    const incompleteProduct = { name: 'Product 12' };
    const response = await request(app)
      .post('/products')
      .send(incompleteProduct)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });
});

describe('DELETE /products/:id', () => {
  test('should delete a product if found', async () => {
    const response = await request(app).delete('/products/1');
    expect(response.statusCode).toBe(204);
  });

  test('should respond with 404 if product not found', async () => {
    const response = await request(app).delete('/products/999');
    expect(response.statusCode).toBe(404);
  });
});
