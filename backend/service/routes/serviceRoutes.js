const express = require('express');
const router = express.Router();
const controllers = require('../controllers/serviceController');
const adminUser = require('../middlewares/middlewareService');



router.post('/payments', controllers.paypalPayement)
router.get('/successPayments', controllers.successPayments);
router.get('/cancelPayments', controllers.cancelPayments)
router.get('/find',adminUser,controllers.findPayment)



module.exports = router;