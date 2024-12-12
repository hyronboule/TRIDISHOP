const express = require('express');
const router = express.Router();
const controllers  = require('../controllers/profilControllers');
const token =  require('../middlewares/middlewareProfil')
const dotenv = require('dotenv');
dotenv.config()

const multer = require('multer');
const upload = multer({
    limits: { fileSize:100 * 1024 },
});

router.get("/user/:pseudo", controllers.profilUser )
router.post("/add",upload.single('image') ,controllers.addProfil)
router.put("/user/:pseudo",token,upload.single('image') ,controllers.updateProfil)
router.delete("/user/:pseudo",token,upload.none(),controllers.deleteProfil)

module.exports = router;