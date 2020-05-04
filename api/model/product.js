const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('product', ProductSchema);