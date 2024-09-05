const User = require('../models/User');

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

        // Suppression de l'utilisateur
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: `User not found ${userId}` });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { getUsers, getUser, deleteUser }