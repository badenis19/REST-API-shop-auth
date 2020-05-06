const Product = require('../model/product');
const mongoose = require('mongoose');

// Product CONTROLLERS

// CREATE
exports.products_get_all = (req, res, next) => { // only '/' needed because it will already have /products from app.js
Product.find()
  .select('name price _id productImage') // to only select certain fields (filter)
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          _id: doc._id, //
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + doc._id
          }
        }
      })
    }
    console.log(docs)
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "err" });
  })
}

// GET CREATE
exports.products_create_product = (req, res, next) => {
  console.log("<<>>", req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  })

  product.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Created product successfully',
      createdProduct: {
        name: result.name,
        price: result.price,
        _id: result._id,
        productImage: req.file.path
      },
      request: {
        type: 'GET',
        url: 'http://localhost:3000/products/' + result._id
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

// GET ONE
exports.products_get_one = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products'
          }
        });
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
}

// PATCH (update)
exports.products_update_one = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) { // to check if we want to update all fields, update only wanted field and cannot add new ones 
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({
    _id: id
  },
    {
      $set: updateOps
    })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "product updated",
        request: {
          type: "GET",
          url: 'http://localhost:3000/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });

    })
}

// e.g of query to post of postman for UPDATE to work 
/*[
    {
        "propName": "price",
        "value": "19.99"
    }
]*/

// DELETE
exports.products_delete_one = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      console.log("Product deleled")
      // console.log(result)
      res.status(200).json({
        message: "Product deleled",
        request: {
          type: "POST",
          url: 'http://localhost:3000/products',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
};