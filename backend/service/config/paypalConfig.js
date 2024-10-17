const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
dotenv.config()

const paypalConfig = () => {
    paypal.configure({
        mode: "sandbox", // sandbox (dev) or live (production)
        client_id: process.env.PAYPAL_ID, 
        client_secret: process.env.PAYPAL_SECRET
    });
};

module.exports = { paypalConfig }