const User = require('../models/User');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

// controllers for interacting to database authentication 

// get all users
const getUsers = async (_, res) => {
    try {
        const users = await User.find();
        // res.status(200).json("coucou");
        res.status(200).json(users);
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
        const user = await User.findOne({ pseudo: userName });

        if (!user) {
            return res.status(404).json({ message: `User not found ${userName}` });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// delete a user with id

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // find user with id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User not found ${userId}` });
        }
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        // delete all products of user
        try {
            const productsResponse = await axios.get(`${process.env.URL_GET_ALL_PRODUCTS_USER}`, {
                params: { name: user.pseudo },
            });

            const products = productsResponse.data.data;
            
            if (products && products.length > 0) {
                // If products are found, delete them
                const deleteProductsResponse = await axios.delete(
                    `${process.env.URL_DELETE_ALL_PRODUCT_USER}${user.pseudo}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );
                
                console.log('Products deletion response:', deleteProductsResponse.data);
            } else {
                console.log(`No products found for user ${user.pseudo}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`No products found for user ${user.pseudo}, skipping deletion.`);
            } else {
                console.error('Error managing user products:', error.message);
                return res.status(500).json({ message: 'Failed to manage user products', error: error.message });
            }
        }


        // delete Profil
        try {
            const profileResponse = await axios.delete(
                `${process.env.URL_DELETE_PROFIL}${user.pseudo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Profile deletion response:', profileResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('User profile not found, skipping deletion');
            } else {
                console.error('Error deleting user profile:', error.message);
                return res.status(500).json({ message: 'Failed to delete user profile', error: error.message });
            }
        }

        // delete user of the database auth
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: 'User, associated products, and profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getUsers, getUser, deleteUser }