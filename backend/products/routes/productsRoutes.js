const express = require("express");
const router = express.Router();
const multer = require('multer');


const upload = multer({
    limits: { fileSize: 300 * 1024 * 1024 }, // Limite de 300 Mo
});

const controllersProducts = require('../controllers/controllersProducts')

router.get("/products", controllersProducts.getProducts)
router.get("/products/:name", controllersProducts.getUserProducts)
router.delete("/deleteProductUser/:id", controllersProducts.deleteProductUser)

router.post("/upload", upload.single('file'), controllersProducts.newProduct)


module.exports = router;