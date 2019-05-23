const mongoose = require('mongoose');

const Ticket = mongoose.Schema({
    ticketNumber: { type: Number, required: true, unique: true },
    date: { type: String, required: true },
    destination: { type: String, required: true }, 
    price: { type: Number, required: true },
    user: { type: String, required: true },
    airlines: { type: String, required: true }
});

module.exports = mongoose.model('Ticket', Ticket)
