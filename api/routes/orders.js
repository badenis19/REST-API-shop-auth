const express = require('express');
const router = express.Router();

// ALL 
router.get('/', (req, res, next) => { // only '/' needed because it will already have /products from app.js
    res.status(200).json({
        message: 'orders were fetched'
    })
})

// CREATE
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.property
    }
    res.status(201).json({
        message: 'order was created',
        order: order
    })
})

// GET ONE
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'specific order fetched',
        id: id
    })
})


// PATCH (update)
router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: "updated order",
    })
})

// DELETE
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: "deleted order",
        id: id
    })
})

module.exports = router;