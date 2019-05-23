const mongoose = require('mongoose');

const User = mongoose.Schema({
    userId: { type: Number, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    airlines: { type: String, required: true },
    registered: { type: String, required: true }
});

module.exports = mongoose.model('User', User)
