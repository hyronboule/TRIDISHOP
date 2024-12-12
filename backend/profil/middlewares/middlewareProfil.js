const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

const token = async (req, res, next) => {

    try {
        if (req.headers.authorization) {
           
            const token = req.headers.authorization.split(' ')[1];
        
            const response = await axios.get(process.env.URL_ROLE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           
           
            if (response) {
                next();
            } else {
                res.status(403).json({ message: "Vous n'avez pas accès" });
            }
        } else {
            res.status(403).json({ message: 'pas autorisé' });
        }
    } catch (error) {
        res.status(404).json({ message: 'error while using the admin middleware : ', error });
    }
}

module.exports = token;

