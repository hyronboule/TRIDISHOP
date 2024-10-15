const UserProfil = require("../models/Profil");


const profilUser = async (req, res) => {
    try {
        const user = await UserProfil.findOne({ pseudo: req.params.pseudo });

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
        return res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur', error });
    }
};


const addProfil = async (req, res) => {
    try {
        const { pseudo, image, contentType, links } = req.body;

        const existingUser = await UserProfil.findOne({ pseudo: pseudo });

        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur existe déjà' });
        }

        const newUserProfil = new UserProfil({
            pseudo: pseudo,
            image: image,
            contentType: contentType,
            links: links
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
        const { contentType, links } = req.body;
        const updateFields = {};

        if (req.file && req.file.buffer) {
            updateFields.image = req.file.buffer;
        }

        if (contentType) {
            updateFields.contentType = contentType || 'image/jpeg';
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


const isValidUrl = (url) => {
    const regex = /^(http:\/\/|https:\/\/)/; 
    return regex.test(url);
};


module.exports = { profilUser, addProfil, updateProfil };