const User = require("../models/User");
const { generateToken } = require("../utils/tokenUtils");
const { checkPassword, hashPassword } = require("../utils/passwordUtils");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

const login = (async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Cet utilisateur n'existe pas" });
        
        const match = await checkPassword(password, user.password);
        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = generateToken({ id: user._id, pseudo: user.pseudo, email, role: user.role })

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const register = async (req, res) => {
    try {
        const { pseudo, email, password, role } = req.body;

        if (!pseudo || !email || !password) {
            return res.status(400).json({ message: 'email, pseudo and password are required' });
        }

        
        const newUser = new User({ pseudo, email, password, role });

        const savedUser = await newUser.save();

        const userToReturn = {
            id: savedUser._id,
            pseudo: savedUser.pseudo,
            email: savedUser.email,
            role: savedUser.role
        };

        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserInfo = async (req, res) => {
    try {

        const userInfo = {
            id: req.auth.userId,
            role: req.auth.role
        }
        res.status(200).json(userInfo);

    } catch (error) {
        res.status(404).json({
            message: "Utilisateur introuvable"
        })
    }
}


const updateUser = async (req, res) => {
    const { pseudo, email, newEmail, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const pseudoRegex = /^[a-zA-Z0-9]+$/;

    if (!email) {
        return res.status(400).json({ message: 'Email of the user is required' });
    }

    const updateData = {};

    if (pseudo) {
        if (!pseudoRegex.test(pseudo)) {
            return res.status(400).json({ message: 'Invalid pseudo format' });
        }
        const existingPseudo = await User.findOne({ pseudo });
        if (existingPseudo && existingPseudo.email !== email) {
            return res.status(400).json({ message: 'Pseudo is already in use' });
        }
        updateData.pseudo = pseudo;
    }

    if (newEmail) {
        if (!emailRegex.test(newEmail)) {
            return res.status(400).json({ message: 'Invalid new email format' });
        }
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail && existingEmail.email !== email) {
            return res.status(400).json({ message: 'New email is already in use' });
        }
        updateData.email = newEmail;
    }

    if (password) {
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
            });
        }
        try {
            const hashedPassword = await hashPassword(password);
            updateData.password = hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            return res.status(500).json({ message: 'Error hashing password' });
        }
    }

    try {
       
        const updatedUser = await User.findOneAndUpdate(
            { email },         
            { $set: updateData }, 
            { new: true }    
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while updating the user' });
    }
};


module.exports = { login, register, getUserInfo,updateUser }