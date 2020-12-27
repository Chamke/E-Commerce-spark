const express = require('express');
const customers = require('../routes/customers');
const orders = require('../routes/orders');
const products = require('../routes/products');
const shipments = require('../routes/shipments');

module.exports = function(app) {

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/orders', orders);
app.use('/api/products',products);
app.use('/api/shipments',shipments);
    
}