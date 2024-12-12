const express = require("express");
const router = express.Router();
const multer = require('multer');
const token = require('../middlewares/middlewareProduct');

const upload = multer({
    limits: { fileSize: 300 * 1024 * 1024 }, // Limite de 300 Mo
});

const controllersProducts = require('../controllers/controllersProducts')

router.get("/products", controllersProducts.getProducts)
router.get("/file/:id", controllersProducts.displayFile)
router.get("/products/user", controllersProducts.getUserProducts)
router.get("/detail/:id", controllersProducts.getDetailProduct)
router.post("/upload",upload.array('files',2), controllersProducts.newProduct)
router.delete("/product/:id",token, controllersProducts.deleteProductUser)
router.delete("/products/user/:pseudo",token, controllersProducts.deleteAllProductUser)
router.put("/product/:id",token, upload.none(), controllersProducts.uniqueProductId)
router.put("/products/user", token,upload.none(), controllersProducts.updateNameUserAllProducts)


module.exports = router;