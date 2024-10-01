const User = require("../models/User");
const { generateToken } = require("../utils/tokenUtils");
const { checkPassword } = require("../utils/passwordUtils");
const dotenv = require('dotenv');
dotenv.config()

const login = (async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Cet utilisateur n'existe pas" });

        const match = await checkPassword(password, user.password);
        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });
        
        const token = generateToken({ id: user._id, pseudo: user.pseudo, email, role: user.role })

        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const register = async (req, res) => {
    try {
        const { pseudo, email, password, role } = req.body;
        let { date } = req.body; 

        const newUser = new User({ pseudo, email, password, date, role });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
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
        console.log(userInfo);
        res.status(200).json(userInfo);
        
    } catch (error) {
        res.status(404).json({
            message: "Utilisateur introuvable"
        })
    }
}

module.exports = { login, register,getUserInfo }