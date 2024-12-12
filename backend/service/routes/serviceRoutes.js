const express = require('express');
const router = express.Router();
const controllers = require('../controllers/serviceController');
const adminUser = require('../middlewares/middlewareService');



router.post('/payments', controllers.paypalPayement)
router.get('/success', controllers.successPayments);
router.get('/cancel', controllers.cancelPayments)
router.get('/transactions',adminUser,controllers.findPayment)



module.exports = router;