const express = require('express');
const app = express();


/* ROUTES */ 
const orderRoutes = require('./api/routes/orders')
const productRoutes = require('./api/routes/products')

/* MIDDLEWARE */ 
app.use('/products', productRoutes); // all '/products' requst will be forwarded to the productRoutes

app.use('/orders', orderRoutes);


module.exports = app;

