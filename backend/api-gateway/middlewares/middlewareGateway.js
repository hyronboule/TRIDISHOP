const axios = require('axios');

const adminUser = async (req, res, next) => {

    try {
        if (req.headers.authorization) {
           
            const token = req.headers.authorization.split(' ')[1];
        
            const response = await axios.get('http://auth:8081/getRole', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           
            const role = response.data.role;
           
            if (role === 'admin') {
                next();
            } else {
                res.status(403).json({ message: "Vous n'avez pas accès à l'espace admin de l'api" });
            }
        } else {
            res.status(403).json({ message: 'pas autorizé' });
        }
    } catch (error) {
        res.status(404).json({ message: 'error while using the admin middleware : ', error });
    }
}

module.exports = adminUser;

