/* IMPORTS */ 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(morgan('dev')) // before routes

/* ROUTES */ 
const orderRoutes = require('./api/routes/orders')
const productRoutes = require('./api/routes/products')
 
/* MIDDLEWARE */   
app.use('/products', productRoutes); // all '/products' requst will be forwarded to the productRoutes
app.use('/orders', orderRoutes);

app.use((req,res,next) => { // handle error for unknown routes, to send specific message
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error,req,res,next) => { // to handle all errors incliding DB ones
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message 
        }
    })
});

module.exports = app;

