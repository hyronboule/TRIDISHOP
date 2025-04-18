const UserProfil = require("../models/Profil");


const profilUser = async (req, res) => {
    try {
        const user = await UserProfil.findOne({ pseudo: req.params.pseudo });
        console.log(`${req.params.pseudo} viens de se connecter` )    
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // convert image to base64
        const imageBase64 = user.image ? user.image.toString('base64') : '';
        const imageSrc = `data:${user.contentType};base64,${imageBase64}`;

        return res.status(200).json({
            ...user.toObject(),
            image: imageSrc,
        });
    } catch (error) {
        console.log(`${req.params.pseudo} error : ${error}` )    
        return res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur', error });
    }
};


const addProfil = async (req, res) => {
    try {
        const { pseudo, image, contentType, links, paypalEmail } = req.body;

        const existingUser = await UserProfil.findOne({ pseudo: pseudo });

        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur existe déjà' });
        }

        const newUserProfil = new UserProfil({
            pseudo: pseudo,
            image: image,
            contentType: contentType,
            links: links,
            paypalEmail: paypalEmail
        });

        const savedUserProfil = await newUserProfil.save();

        return res.status(201).json({ message: "User Created", data: savedUserProfil });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user profile', error });
    }
};


const updateProfil = async (req, res) => {
    try {
        const pseudo = req.params.pseudo;
        const { contentType, links, paypalEmail, newPseudo } = req.body;
        const updateFields = {};
        const pseudoRegex = /^[a-zA-Z0-9]{1,10}$/
        const paypalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      

        if (newPseudo) {
            const existingProduct = await UserProfil.findOne({ pseudo: newPseudo });
            if (existingProduct) {
                return res.status(400).send({
                    message: "The new pseudo is already in use in the products collection",
                });
            }
        }

        if (req.file && req.file.buffer) {
            updateFields.image = req.file.buffer;
        }

        if (contentType) {
            updateFields.contentType = contentType || 'image/jpeg';
        }
        if (paypalEmail) {
    
            if (!paypalEmailRegex.test(paypalEmail)){
        
                return res.status(404).send({
                    message: "paypal email is not valid",
                });
            }
            updateFields.paypalEmail = paypalEmail || '';
        }
        if (newPseudo) {
            if (!pseudoRegex.test(newPseudo)) {
                return res.status(400).json({ message: 'Le pseudo doit être unique et ne contenir que des lettres et des chiffres' });
            }
            updateFields.pseudo = newPseudo || '';
        }

        if (links) {
            if (links.instagram && isValidUrl(links.instagram)) {
                updateFields.links = updateFields.links || {};
                updateFields.links.instagram = links.instagram;
            } else if (links.instagram) {
                return res.status(400).json({ message: 'Le lien Instagram doit commencer par http:// ou https://' });

            }

            if (links.facebook && isValidUrl(links.facebook)) {
                updateFields.links = updateFields.links || {};
                updateFields.links.facebook = links.facebook;
            } else if (links.facebook) {
                return res.status(400).json({ message: 'Le lien Facebook doit commencer par http:// ou https://' });
            }
        }

        const userProfil = await UserProfil.findOneAndUpdate(
            { pseudo: pseudo },
            { $set: updateFields },
            { new: true }
        );

        if (!userProfil) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "Utilisateur mise à jour", data: userProfil });
    } catch (error) {
        return res.status(500).json({
            message: 'Erreur lors de la mise à jour du profil utilisateur',
            error: error.message || 'An unknown error occurred'
        });
    }
};

const deleteProfil = async (req, res) => {
    const pseudo = req.params.pseudo;
    if (!pseudo) {
        return res.status(400).json({ message: 'Missing pseudo parameter' });
    }
    try {
        const user = await UserProfil.findOneAndDelete({ pseudo });

        if (!user) {
            return res.status(404).json({ message: `User with pseudo "${pseudo}" not found` });
        }

        return res.status(200).json({ message: `User with pseudo "${pseudo}" deleted successfully` });
    } catch (error) {
        console.error('Error deleting profile:', error.message);
        return res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
};


const isValidUrl = (url) => {
    const regex = /^(http:\/\/|https:\/\/)/;
    return regex.test(url);
};


module.exports = { profilUser, addProfil, updateProfil, deleteProfil };