const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('product', ProductSchema);