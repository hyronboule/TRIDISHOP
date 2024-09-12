const Product = require('../models/Product');
const { displayFilefunction } = require('../utils/recoveryFile');
const { uploadFile } = require('../utils/uploadFile')
const { v4: uuidv4 } = require('uuid');
const { loopProducts } = require('../utils/callRecoveryFile');
const { arrayTags } = require('../utils/arrayTags');
const { deleteFile } = require('../utils/deleteFile');
const dotenv = require('dotenv');

dotenv.config()
// controllers for interacting to database products

// get all products 
const getProducts = async (req, res) => {
    const limit = process.env.LIMIT;
    try {
        const page = parseInt(req.query.page) || 0;
        let skip = limit * page;

        const products = await Product.find().skip(skip).limit(limit)
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        const newProducts = await loopProducts(products)

        res.status(200).json({ data: newProducts, urlPage: process.env.URI + '/products?page=1' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get file (image3D) by id 
const displayFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        await displayFilefunction(fileId, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all products from user with pseudo 
const getUserProducts = async (req, res) => {
    const limit = process.env.LIMIT;
    try {
        const page = parseInt(req.query.page) || 0;
        let skip = limit * page;

        const userName = req.query.name

        const products = await Product.find({ pseudo: userName }).skip(skip).limit(limit);

        if (products.length === 0) {
            return res.status(404).json({ message: `User not found ${userName}` });
        } else {
            const newProducts = await loopProducts(products)

            res.status(200).json({ data: newProducts, urlPage: process.env.URI + '/products?page=1' });
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
            tags: arrayTags(req.body.tags),
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
    const namefile = req.params.id;

    if (!namefile) {
        return res.status(400).json({ message: 'Missing product nameFile' });
    }

    try {

        const product = await Product.findOne({ nameFile: namefile })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await deleteFile(namefile, res);

        await Product.deleteOne({ _id: product._id })

        return res.status(200).json({
            message: 'Product deleted successfully',
            data: product
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error with deletion', error: error.message });
    }

};

// upadate info product from id
const uniqueProductId = async (req, res) => {
    const namefile = req.params.id;

    if (!namefile) {
        return res.status(400).json({ message: 'Missing product nameFile' });
    }

    const { tags, description, download } = req.body;
    

    try {
        const product = await Product.findOne({ nameFile: namefile })

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if (tags !== undefined){ 
            product.tags = arrayTags(tags);
        };
        if (description !== undefined) product.description = description;
        if (download !== undefined) product.download = download;


        const updatedProduct = await product.save();

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: "Error updating the product", error: error });
    }
}

module.exports = { getProducts, getUserProducts, deleteProductUser, newProduct, displayFile, uniqueProductId }