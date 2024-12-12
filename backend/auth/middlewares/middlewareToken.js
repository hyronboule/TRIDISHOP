const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const token = async (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: 'Pas autorisé, token manquant' });
        }

        const token = req.headers.authorization.split(' ')[1];

        const response = await axios.get(process.env.URL_ROLE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { role } = response.data;

     
        if (role === 'admin') {
            return next();
        }

       
        if (role === 'user') {
            
            const decodedToken = jwt.decode(token);
            const tokenEmail = decodedToken.email;
            
            const requestEmail = req.body.email || req.query.email;
            

            if (!requestEmail) {
                return res.status(400).json({ message: "L'email est requis dans la requête" });
            }

            if (requestEmail !== tokenEmail) {
                
                return res.status(403).json({ message: "L'email ne correspond pas à celui du token" });
            }

            return next();
        }

        res.status(403).json({ message: "Accès interdit : rôle non reconnu" });
    } catch (error) {
        res.status(401).json({ message: 'Erreur lors de la vérification du token ou du rôle', error });
    }
};

module.exports = token;

