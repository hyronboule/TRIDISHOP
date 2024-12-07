const express = require("express");
const router = express.Router();
const multer = require('multer');
const token = require('../middlewares/middlewareProduct');

const upload = multer({
    limits: { fileSize: 300 * 1024 * 1024 }, // Limite de 300 Mo
});

const controllersProducts = require('../controllers/controllersProducts')

router.get("/products", controllersProducts.getProducts)
router.get("/displayFile/:id", controllersProducts.displayFile)
router.get("/productsUser", controllersProducts.getUserProducts)
router.get("/detailProduct/:id", controllersProducts.getDetailProduct)
router.post("/upload",upload.array('files',2), controllersProducts.newProduct)
router.delete("/deleteProductUser/:id",token, controllersProducts.deleteProductUser)
router.delete("/deleteAllProductUser/:pseudo",token, controllersProducts.deleteAllProductUser)
router.put("/updateProduct/:id",token, upload.none(), controllersProducts.uniqueProductId)
router.put("/updateNameUserAllProduct", token,upload.none(), controllersProducts.updateNameUserAllProducts)



module.exports = router;