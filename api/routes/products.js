const express = require('express');
const router = express.Router(); // importing express router
const mongoose = require('mongoose');
const Product = require('../model/product');


// ALL 
router.get('/', (req, res, next) => { // only '/' needed because it will already have /products from app.js
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs)
            // if(doc.length >= 0 ){ // error handling if nothing is returned from query
            res.status(200).json(docs);
            // } else {
            //     res.status(404).json({
            //         message: "No entries found"
            //     })
            // }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "err" });
        })

})


// CREATE
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling product post request',
            createdProduct: product
        })
    }).catch(err => {
        console.log(err)

    })
})


// GET ONE
router.get('/:productId', async (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            // console.log(doc);
            if (doc) {
                res.status(200).json({ doc });
            } else {
                res.status(404).json({ message: "No valid entry found for provided id" });
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

})


// PATCH (update)
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}; 
    for (const ops of req.body) { // to check if we want to update all fields, update only wanted field and cannot add new ones 
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
        _id: id
    },
        {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result)
            result.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            result.status(500).json({ error: err });

        })
})

// e.g of query to post of postman for UPDATE to work 
/*[
    {
        "propName": "price",
        "value": "19.99"
    }
]*/ 


// DELETE
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            result.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})


module.exports = router;

