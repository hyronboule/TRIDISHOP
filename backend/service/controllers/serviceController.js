const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
const { paypalConfig } = require('../config/paypalConfig');
dotenv.config()

const PORT = process.env.BASE_PORT

const paypalPayement = (req, res) => {
    const { amount, sellerPayPalId, payerId } = req.body;
    
    paypalConfig()

    const payment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `http://localhost:${PORT}/api/service/successPayments?payerId=${payerId}`, // sucess payment with parameters payerId
            cancel_url: `http://localhost:${PORT}/api/service/cancelPayments`, // cancel payment
        },
        transactions: [{
            amount: {
                total: amount, // total amount
                currency: 'EUR',
            },
            payee: {
                email: sellerPayPalId, // paypal address  to seller
            },
            description: 'Achat des produits choisis',
        }],
    };

    // create payment
    paypal.payment.create(payment, (error, payment) => {
        if (error) {
            return res.status(500).json({ message: 'Error creating payment:', error: error  });
        }

        // search approval url
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        if (approvalUrl) {
            // return approval url to frontend for payment process
            return res.json({ approvalUrl: approvalUrl.href });
        } else {
            return res.status(500).json({ error: 'Not found approval url' });
        }
    });
}

const cancelPayments = (req, res) => {
    res.json({ message: 'Payement canceled' });
}

const successPayments = (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id: req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, (error, payment) => {
        if (error) {
            res.status(500).json({ error: 'Error while executing payment', details: error.response });
        } else {
            if (payment.state === 'approved') {
                res.json({status: 202, message: 'payement approved'});
            } else {
                res.send({status: 203, message: 'payement not approved'});
            }
        }
    });
}


module.exports = {
    paypalPayement, cancelPayments, successPayments
}