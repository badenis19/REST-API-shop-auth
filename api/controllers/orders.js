const Order = require('../model/order');
const Product = require('../model/product');
const mongoose = require('mongoose');

// ORDERS CONTROLLER

// ALL 
exports.orders_get_all = (req, res, next) => {
Order.find({})
  .select('product quantity _id')
  .populate('product', 'name') // (name of property, property filter)
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
}

// CREATE
exports.orders_create_order = (req, res, next) => {
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
};

// GET ONE 
exports.orders_get_one = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .populate('product')
    .exec()
    .then(order => {
      console.log(order);
      if (order) {
        res.status(200).json({
          order: order,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/orders'
          }
        });
      } else {
        res.status(404).json({ message: "No valid entry found for provided id" });
      }

    })
}

// DELETE
exports.orders_delete_one = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleled",
        request: {
          type: "POST",
          url: 'http://localhost:3000/orders',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
}