const express = require("express");
const router = express.Router();
const controllersAuth = require('../controllers/adminControllersAuth')


// routes users admin
router.get("/users", controllersAuth.getUsers)
router.get("/user/:name", controllersAuth.getUser)
router.delete("/deleteUser/:id", controllersAuth.deleteUser)



module.exports = router;