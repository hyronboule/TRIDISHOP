const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload, expiresIn = '1h') {
    try {
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
        return token;
    } catch (error) {
        console.error('Erreur lors de la génération du token:', error);
        throw error;
    }
}

module.exports = { generateToken };