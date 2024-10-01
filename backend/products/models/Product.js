const mongoose = require("mongoose");
const { defaultDate } = require("../utils/date");
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
        minlength: 3,
        maxlength: 10
    },
    download: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        maxlength: 150
    },
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: function (tags) {
                // Limite le nombre d'éléments dans le tableau 'tags' à 5
                return tags.length <= 5;
            },
            message: 'Le nombre maximal de tags est de 5.'
        }
    },
    // filename for recovery files in GridFs
    nameFile: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: Buffer,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: defaultDate
    }
});

// Pre-save hook to generate a unique identifier for `nameFile` using uuid
productSchema.pre('save', function (next) {
    if (!this.nameFile) {
        this.nameFile = uuidv4(); // Génère un identifiant unique en utilisant uuid
    }
    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;