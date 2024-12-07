const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authControllers')
const middleware = require("../middlewares/middlewaresAuth");
const token = require('../middlewares/middlewareToken')


router.post("/login",controllers.login)
router.post("/register",controllers.register)
router.get("/getRole", middleware,controllers.getUserInfo);
router.put("/updateInfoUser",token,controllers.updateUser);


module.exports = router;