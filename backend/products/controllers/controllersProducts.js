const Product = require('../models/Product');
const { recoveryFile, displayFilefunction } = require('../utils/recoveryFile');
const { uploadFile } = require('../utils/uploadFile')
const { v4: uuidv4 } = require('uuid');

// controllers for interacting to database products

// get all products (rajouter filtre date)
const getProducts = async (_, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) { 
            return res.status(404).json({ message: 'No products found' });
        }

        const newProducts = await Promise.all(products.map(async (product) => {
            const newFile = await recoveryFile(product.nameFile);
            return { ...product.toObject(), file: newFile };
        }));

        res.status(200).json(newProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get one product by id 
const displayFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        await displayFilefunction(fileId, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all products from user with pseudo (rajouter filtre date)
const getUserProducts = async (req, res) => {
    try {
        const userName = req.params.name

        const products = await Product.find({ pseudo: userName });

        if (products.length < 0) {
            return res.status(404).json({ message: `User not found ${userName}` });
        } else {
            res.status(200).json(products);
        }


    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// add new product

const newProduct = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const fileName = uuidv4();

        const newProductInfo = new Product({
            nameFile: fileName,
            pseudo: req.body.pseudo,
            description: req.body.description,
            tags: req.body.tags,
            price: req.body.price,
        });

        const result = await uploadFile(file, fileName, newProductInfo);

        res.status(201).json({
            message: result,
            product: newProductInfo,
        });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// delete a product to user from id (rajouter filtre pour avoir produit de l'user avant de suppr)
const deleteProductUser = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: `product not found ${productId}` });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// upadate info product from id
const uniqueProductId = async (req, res) => {
    const id = req.params.id

    // recupération du body 

}

module.exports = { getProducts, getUserProducts, deleteProductUser, newProduct, displayFile }