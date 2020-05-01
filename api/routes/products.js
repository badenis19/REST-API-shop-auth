const express = require('express');
const router = express.Router(); // importing express router

// ALL 
router.get('/', (req, res, next) => { // only '/' needed because it will already have /products from app.js
    res.status(200).json({ message: 'Handling product get request' })
})

// CREATE
router.post('/', (req, res, next) => {
    res.status(200).json({ message: 'Handling product post request' })
})

// GET ONE
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        id: id
    })
})

// PATCH (update)
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "updated product",
    })
})

// DELETE
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "deleted product",
        id: id
    })
})


module.exports = router;

