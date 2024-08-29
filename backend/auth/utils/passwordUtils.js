const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
    const saltRounds = 10; // Le nombre de tours de salage

    try {
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Erreur lors du hachage du mot de passe:', err);
        throw err; // Relancer l'erreur pour la gestion des erreurs en aval
    }
}

async function checkPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { hashPassword, checkPassword };