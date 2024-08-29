// const User = require('../../auth/models/User');

// controllers for interacting to database authentication 


// get all users
const getUsers = async (_, res) => {
    try {
        // const users = await User.find();
        // res.status(200).json(users);
        res.status(200).json({
            message: 'Liste des utilisateurs'
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a user with pseudo
const getUser = async (req, res) => {
    try {
        const userName = req.params.name

        // Récupération de l'utilisateur
        // const user = await User.findOne({ pseudo: userName }); 

        // if (!user) {
        //   return res.status(404).json({ message: `User not found ${userName}` });
        // }else{
        //   res.status(200).json(user);
        //  }

        res.status(200).json({
            message: `Utilisateur ${userName} trouvé`
        });
  
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// delete a user with id
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

   // Suppression de l'utilisateur
    // const user = await User.findByIdAndDelete(userId);

    // if (!user) {
    //   return res.status(404).json({ message: `User not found ${userId}` });
    // }
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// controllers for interacting to database products

// get all products
const getProducts = async (_, res) => {
    try {
        // const products = await product.find();
        // res.status(200).json(products);
        res.status(200).json({
            message: 'Liste des produits'
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all products from user with pseudo
 const getUserProducts = async (req, res) => {
    try {
        const userName = req.params.name

        // Récupération des produits de l'utilisateur
        // const products = await Product.find({ pseudo: userName });

        // if (!products) {
        //   return res.status(404).json({ message: `User not found ${userName}` });
        // }else{
        //   res.status(200).json(products);
        //  }

        res.status(200).json({
            message: `Produits de l'utilisateur ${userName} trouvés`
        });
  
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// delete a product from id 
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

   // Suppression de l'utilisateur
    // const product = await Product.findByIdAndDelete(productId);

    // if (!product) {
    //   return res.status(404).json({ message: `product not found ${productId}` });
    // }

    res.status(200).json({ message: 'Products deleted successfully' + productId });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {getUsers,getUser,deleteUser,getProducts,getUserProducts,deleteProduct}