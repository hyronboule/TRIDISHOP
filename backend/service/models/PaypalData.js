const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true }, // ID PayPal
    buyer: {
        email: { type: String, required: true }, 
        id: { type: String, required: true }, 
    },
    sellers: [
        {

            email: { type: String, required: true }, 
            amount: { type: Number, required: true }, 
        },
    ],
    totalAmount: { type: Number, required: true }, 
    status: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Transactions', transactionSchema);
