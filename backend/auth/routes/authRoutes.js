const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authControllers')
const middleware = require("../middlewares/middlewaresAuth");
const token = require('../middlewares/middlewareToken')


router.post("/login",controllers.login)
router.post("/register",controllers.register)
router.get("/verify-email/:email",controllers.verificationAccount);
router.get("/role", middleware,controllers.getUserInfo);
router.put("/user",token,controllers.updateUser);
router.delete("/user/:id",token, controllers.deleteUser)

module.exports = router;