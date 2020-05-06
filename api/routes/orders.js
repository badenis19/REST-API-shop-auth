const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// CONTROLLERS
const OrdersController = require('../controllers/orders')

// ALL 
router.get('/', checkAuth, OrdersController.orders_get_all)

// CREATE
router.post('/', checkAuth, OrdersController.orders_create_order)

// GET ONE
router.get('/:orderId', checkAuth, OrdersController.orders_get_one )

// DELETE
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_one)

module.exports = router;