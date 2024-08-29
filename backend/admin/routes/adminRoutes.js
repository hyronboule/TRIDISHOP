const express = require("express");
const router = express.Router();
const controllers = require('../controllers/adminControllers')

// routes users admin
router.get("/users",controllers.getUsers)
router.get("/user/:name",controllers.getUser)
router.delete("/deleteUser/:id",controllers.deleteUser)

// routes products admin
router.get("/products",controllers.getProducts)
router.get("/products/:name",controllers.getUserProducts)
router.delete("/deleteProduct/:id",controllers.deleteProduct)

module.exports = router;