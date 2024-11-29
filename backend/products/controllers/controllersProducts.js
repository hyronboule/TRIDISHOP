const Product = require('../models/Product');
const { displayFilefunction } = require('../utils/recoveryFile');
const { uploadFile } = require('../utils/uploadFile')
const { v4: uuidv4 } = require('uuid');
const { loopProducts, fileProduct } = require('../utils/callRecoveryFile');
const { arrayTags } = require('../utils/arrayTags');
const { deleteFile } = require('../utils/deleteFile');
const dotenv = require('dotenv');


dotenv.config()
// controllers for interacting to database products

// get all products 
const getProducts = async (req, res) => {
    const limit = parseInt(process.env.LIMIT) || 10;
    try {
        const page = parseInt(req.query.page) || 0;
        const skip = limit * page;


        const search = req.query.search ? req.query.search.trim() : '';

        let products;

        // If search is present, search by tags or nickname
        if (search) {
            products = await Product.find({
                $or: [
                    { tags: { $regex: search, $options: 'i' } }, // search with tags
                    { pseudo: { $regex: search, $options: 'i' } } // search with pseudo
                ]
            }).skip(skip).limit(limit);
        } else {
            products = await Product.find().skip(skip).limit(limit);
        }


        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        const totalProducts = await Product.countDocuments(search ? {
            $or: [
                { tags: { $regex: search, $options: 'i' } },
                { pseudo: { $regex: search, $options: 'i' } }
            ]
        } : {});

        const totalPages = Math.ceil(totalProducts / limit);


        if (page >= totalPages) {
            return res.status(404).json({ message: 'No more products found' });
        }

        const nextPage = page + 1 < totalPages ? page + 1 : null;
        const nextPageUrl = nextPage !== null ? `${process.env.URI}/products?page=${nextPage}&search=${search}` : null;


        let newProducts = await loopProducts(products);

        // Return data
        res.status(200).json({
            data: newProducts,
            urlPage: nextPageUrl,
        });
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
        const skip = limit * page;
        const userName = req.query.name;

        const products = await Product.find({ pseudo: userName }).skip(skip).limit(limit);

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found for user ${userName}` });
        }

        const totalProducts = await Product.countDocuments({ pseudo: userName });

        const totalPages = Math.ceil(totalProducts / limit);

        if (page >= totalPages && totalPages > 0) {
            return res.status(404).json({ message: 'No more products found' });
        }

        const nextPage = page + 1 < totalPages ? page + 1 : null;
        const nextPageUrl = nextPage !== null ? `${process.env.URI}/products?name=${userName}&page=${nextPage}` : null;

        const newProducts = await loopProducts(products);

        res.status(200).json({
            data: newProducts,
            urlPage: nextPageUrl,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// detail prduct wuth id

const getDetailProduct = async (req, res) => {
    try {
        const productNameFile = req.params.id;

        const product = await Product.findOne({ nameFile: productNameFile });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let newProduct = await fileProduct(product);

        res.status(200).json({ data: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// add new product

const newProduct = async (req, res) => {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: 'No files uploaded' });
        }

        let file3D = null;
        let imageFile = null;


        req.files.forEach(file => {
            if (file.mimetype === 'model/gltf-binary' || file.originalname.endsWith('.glb')) {
                file3D = file;
            } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                imageFile = file;
            }
        });

        if (!file3D || !imageFile) {
            return res.status(400).json({ msg: 'Both 3D file and image are required' });
        }

        const fileName = uuidv4();

        const newProductInfo = new Product({
            nameFile: fileName,
            pseudo: req.body.pseudo,
            description: req.body.description,
            tags: arrayTags(req.body.tags),
            price: req.body.price,
            image: imageFile.buffer,
        });

        const result = await uploadFile(file3D, fileName, newProductInfo);

        res.status(201).json({
            message: result,
            product: newProductInfo,
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// delete a product to user from id 
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
const deleteAllProductUser = async (req, res) => {
    const pseudo = req.params.pseudo; 

    if (!pseudo) {
        return res.status(400).json({ message: 'Missing pseudo parameter' });
    }

    try {
        const products = await Product.find({ pseudo });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        for (const product of products) {
            await deleteFile(product.nameFile, res); 
        }
        await Product.deleteMany({ pseudo });

        return res.status(200).json({
            message: 'All products deleted successfully',
            count: products.length,
            data: products,
        });

    } catch (error) {
        console.error('Error deleting products:', error);
        return res.status(500).json({ message: 'Error deleting products', error: error.message });
    }
};


// upadate info product from id
const uniqueProductId = async (req, res) => {
    const namefile = req.params.id;

    if (!namefile) {
        return res.status(400).json({ message: 'Missing product nameFile' });
    }

    const { tags, description, download, price } = req.body;


    try {
        const product = await Product.findOne({ nameFile: namefile })

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if (tags !== undefined) {
            product.tags = arrayTags(tags);
        };
        if (description !== undefined) product.description = description;
        if (download !== undefined) product.download = download;
        if (price !== undefined) product.price = price;


        const updatedProduct = await product.save();

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: "Error updating the product", error: error.message });
    }
}

// update pseudo with the new pseudo in all the products of user
const updateNameUserAllProducts = async (req, res) => {
    const nameUser = req.query.name;
    const newPseudo = req.query.pseudo;

    if (!nameUser || !newPseudo) {
        return res.status(404).send({
            message: "No name provided to change the pseudo of the products or no new pseudo",
        });
    }
    const existingProduct = await Product.findOne({ pseudo: newPseudo });
    if (existingProduct) {
        return res.status(400).send({
            message: "The new pseudo is already in use in the products collection",
        });
    }

    try {
        const result = await Product.updateMany(
            { pseudo: nameUser }, 
            { $set: { pseudo: newPseudo } } 
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: "No products found to update" });
        }

        return res.status(200).send({
            message: `${result.modifiedCount} product(s) updated successfully`,
        });
    } catch (error) {
        console.error("Error updating products:", error);
        return res.status(500).send({
            message: "An error occurred while updating the pseudo",
        });
    }
};

module.exports = { getProducts, getUserProducts, deleteProductUser, newProduct, displayFile, uniqueProductId, getDetailProduct, updateNameUserAllProducts, deleteAllProductUser }