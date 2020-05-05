const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true, // does make the field unique, just performance optimization
        match: /.+@.+\..+/i // regex to ensure it has email address format
    },
    password: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('user', UserSchema); 