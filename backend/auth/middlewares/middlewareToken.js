const axios = require('axios');
const jwt = require('jsonwebtoken');

const token = async (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: 'Pas autorisé, token manquant' });
        }

        const token = req.headers.authorization.split(' ')[1];

        const response = await axios.get('http://auth:8081/getRole', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { role } = response.data;

     
        if (role === 'admin') {
            return next();
        }

       
        if (role === 'user') {
            console.log('ici');
            
            const decodedToken = jwt.decode(token);
            const tokenEmail = decodedToken.email;
            console.log(tokenEmail);
            
            const requestEmail = req.body.email || req.query.email;
            console.log(requestEmail);
            

            if (!requestEmail) {
                return res.status(400).json({ message: "L'email est requis dans la requête" });
            }

            if (requestEmail !== tokenEmail) {
                console.log('là');
                
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

