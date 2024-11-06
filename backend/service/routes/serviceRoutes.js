const express = require('express');
const router = express.Router();
const controllers = require('../controllers/serviceController')


router.post('/payments', controllers.paypalPayement)
router.get('/successPayments', controllers.successPayments);
router.get('/cancelPayments', controllers.cancelPayments)



module.exports = router;