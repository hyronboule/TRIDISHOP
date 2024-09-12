const express = require("express");
const router = express.Router();
const multer = require('multer');


const upload = multer({
    limits: { fileSize: 300 * 1024 * 1024 }, // Limite de 300 Mo
});

const controllersProducts = require('../controllers/controllersProducts')

router.get("/products", controllersProducts.getProducts)
router.get("/displayFile/:id", controllersProducts.displayFile)
router.get("/productsUser", controllersProducts.getUserProducts)
router.delete("/deleteProductUser/:id", controllersProducts.deleteProductUser)
router.put("/updateProduct/:id",upload.none(), controllersProducts.uniqueProductId)
router.post("/upload", upload.single('file'), controllersProducts.newProduct)


module.exports = router;