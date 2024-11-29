const express = require('express');
const router = express.Router();
const controllers  = require('../controllers/profilControllers');
const dotenv = require('dotenv');
dotenv.config()

const multer = require('multer');
const upload = multer({
    limits: { fileSize:100 * 1024 },
});

router.get("/profilUser/:pseudo", controllers.profilUser )
router.post("/addProfil",upload.single('image') ,controllers.addProfil)
router.put("/updateProfil/:pseudo",upload.single('image') ,controllers.updateProfil)
router.delete("/deleteProfil/:pseudo",upload.none(),controllers.deleteProfil)

module.exports = router;