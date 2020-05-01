const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
})

module.exports = mongoose.model('order', OrderSchema);