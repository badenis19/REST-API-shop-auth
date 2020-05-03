const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../model/order');
const Product = require('../model/product');

// ALL 
router.get('/', (req, res, next) => { // only '/' needed because it will already have /products from app.js
  Order.find({})
    .select('product quantity _id')
    .exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/orders/' + doc._id
            }
          }
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.json(500).json({
        error: err
      })
    })
})

// CREATE
router.post('/', (req, res, next) => {
  Product.findById(req.body.productId) // check if we have product for a given ID before
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          products: result.product,
          quantity: result.quantity,
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + result._id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
});

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