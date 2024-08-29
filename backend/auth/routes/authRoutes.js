const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authControllers')
const middleware = require("../middlewares/middlewaresAuth");


router.post("/login",controllers.login)
router.post("/register",controllers.register)
router.get("/getRole", middleware,controllers.getUserInfo);


module.exports = router;