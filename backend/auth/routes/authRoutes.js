const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authControllers')

router.post("/login",controllers.login)

module.exports = router;