/* IMPORTS */
const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');

app.use(morgan('dev')); // before routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => { // to add the CORS header to every request. (before routes)
    res.header('Access-Control-Allow-Origin', "*") // '*' to give access to any origin
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){ // req.method gives access to HTTP method used 
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
});

/* ROUTES */
const orderRoutes = require('./api/routes/orders')
const productRoutes = require('./api/routes/products')

/* MIDDLEWARE */
app.use('/products', productRoutes); // all '/products' requst will be forwarded to the productRoutes
app.use('/orders', orderRoutes);

app.use((req, res, next) => { // handle error for unknown routes, to send specific message
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => { // to handle all errors incliding DB ones
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;

