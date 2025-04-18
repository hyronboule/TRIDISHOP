const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

// Read the default image as a Buffer

const defaultImagePath = path.join(__dirname, '../images', 'imageProfilDefault.png');
const defaultImageBuffer = fs.readFileSync(defaultImagePath);

const linksSchema = new mongoose.Schema({
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' }
  });
  

const profilSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+$/,
        minlength: 1,
        maxlength: 10
    },
    links: {
        type: linksSchema, 
        required: true,
        default: () => ({ instagram: '', facebook: '' }) 
    },
    image: {
        type: Buffer,
        required: true,
        default: defaultImageBuffer
    },
    contentType: {
        type: String,
        required: true,
        default: 'image/png'
    },
    paypalEmail: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
})

const UserProfil = mongoose.model("Profil", profilSchema);

module.exports = UserProfil;