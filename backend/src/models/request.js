const mongoose = require('mongoose');

const Request = mongoose.Schema({
    date: { type: String, required: true },
    destination: { type: String, required: true },
    reason: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: String, required: true },
    airlines: { type: String, required: true },
    status: { type: String, required: true },
    ticketNumber: { type: Number, required: true }
});

module.exports = mongoose.model('Request', Request)
