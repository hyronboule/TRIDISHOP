const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
const { paypalConfig } = require('../config/paypalConfig');
dotenv.config();
const path = require('path');
const Transactions = require('../models/PaypalData');


const PORT = process.env.BASE_PORT;
const sitePayPalId = process.env.PAYPAL_TRIDI; // paypal TRIDI

const paypalPayement = (req, res) => {
    const { payments, buyerId } = req.body;
    if (!payments || payments.length === 0) {
        return res.status(400).json({ message: 'No payments provided' });
    }

    paypalConfig();

    // Total amount with site fees
    const totalAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
    const siteFee = (totalAmount * 0.05).toFixed(2);
    const totalAmountWithFee = (totalAmount + parseFloat(siteFee)).toFixed(2);

    const paymentData = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `http://localhost:${PORT}/api/service/successPayments?buyerId=${buyerId}&payments=${encodeURIComponent(JSON.stringify(payments))}`,
            cancel_url: `http://localhost:${PORT}/api/service/cancelPayments`,
        },
        transactions: [{
            amount: {
                total: totalAmountWithFee,
                currency: 'EUR',
            },
            description: 'Achat des produits choisis',
        }],
    };

    // Create the payment
    paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
            console.error('Error creating payment:', error);
            return res.status(500).json({ message: 'Error creating payment', error: error });
        }
        // return the url for the payment in paypal
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        if (approvalUrl) {
            return res.json({ approvalUrl: approvalUrl.href });
        } else {
            return res.status(500).json({ error: 'Not found approval url' });
        }
    });
}

// cancel payment
const cancelPayments = (req, res) => {
    res.sendFile(path.join(__dirname, '../html/renderCancelPaiement.html'))
}

// Success payment and paid seller and the fees to site


const successPayments = async (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id: req.query.PayerID };

    // Récupérer les paiements envoyés par le client
    const payments = JSON.parse(decodeURIComponent(req.query.payments));

    paypal.payment.execute(paymentId, payerId, async (error, payment) => {
        if (error) {
            return res.status(500).json({ error: 'Error while executing payment', details: error.response });
        } else {
            if (payment.state === 'approved') {
                if (!Array.isArray(payments) || payments.length === 0) {
                    return res.status(400).json({ message: 'No valid payments to distribute' });
                }

                try {
                   
                    const buyer = {
                        email: payment.payer.payer_info.email,
                        id: payment.payer.payer_info.payer_id,
                    };

                    const sellers = payments.map((paymentDetail) => ({
                        email: paymentDetail.sellerPayPalId, 
                        amount: parseFloat(paymentDetail.amount).toFixed(2),
                    }));

                    
                    const totalAmount = payments.reduce((sum, paymentDetail) => sum + parseFloat(paymentDetail.amount), 0);
                    const status = payment.state;

                   
                    const transaction = new Transactions({
                        transactionId: paymentId,
                        buyer: buyer,
                        sellers: sellers,
                        totalAmount: totalAmount.toFixed(2),
                        status: status,
                        createdAt: new Date(),
                    });

                   
                    await transaction.save();

                    
                    distributePayments(payments, res);

                    res.sendFile(path.join(__dirname, '../html/renderSucessPaiement.html'));
                } catch (dbError) {
                    console.error('Error saving transaction to database:', dbError);
                    return res.status(500).json({ message: 'Error saving transaction to database', error: dbError });
                }
            } else {
                res.status(400).json({ status: 203, message: 'Paiement non approuvé' });
            }
        }
    });
};


// function paid seller and the fees to site
const distributePayments = (payments, res) => {
    let errorMessage = '';
    payments.forEach(paymentDetail => {
        const sellerPayment = {
            amount: paymentDetail.amount,
            sellerPayPalId: paymentDetail.sellerPayPalId,
        };

        const payout = {
            sender_batch_header: {
                sender_batch_id: Math.random().toString(36).substring(9),
                email_subject: 'Tu as un paiement!',
            },
            items: [{
                recipient_type: 'EMAIL',
                amount: {
                    value: parseFloat(sellerPayment.amount).toFixed(2),
                    currency: 'EUR',
                },
                receiver: sellerPayment.sellerPayPalId,
                note: 'Félicitation pour votre vente!',
                sender_item_id: 'item_1',
            }],
        };

        // Pay the site fees
        const sitePayout = {
            sender_batch_header: {
                sender_batch_id: Math.random().toString(36).substring(9),
                email_subject: 'Site Fees Payment',
            },
            items: [{
                recipient_type: 'EMAIL',
                amount: {
                    value: (parseFloat(sellerPayment.amount) * 0.05).toFixed(2),
                    currency: 'EUR',
                },
                receiver: sitePayPalId,
                note: 'Frais de service',
                sender_item_id: 'service_fee',
            }],
        };

        // Create payment for seller
        paypal.payout.create(payout, true
                , (error, payoutResponse) => {
                if (error) {
                    errorMessage = error;
                   return;
                }
            }
        );

        // Create payment for site fees
        paypal.payout.create(sitePayout, true
                , (error, payoutResponse) => {
                if (error) {
                    errorMessage = error;
                    return;
                }
            }
        );
    });
    if (errorMessage) {
        return res.status(500).json({ message: 'Error distributing payment: ', error: errorMessage });
    }
    
}

const findPayment = async (req,res)=>{
    const data = await Transactions.find();
    res.json(data)
}



module.exports = {
    paypalPayement, cancelPayments, successPayments, findPayment
}
