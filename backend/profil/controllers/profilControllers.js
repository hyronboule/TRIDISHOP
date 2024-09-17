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
            return res.status(400).json({ message: 'User already exists' });
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

        let imageBuffer = null;

        if (req.file.buffer) {
            imageBuffer = req.file.buffer;
        }

        const userProfil = await UserProfil.findOneAndUpdate(
            { pseudo: pseudo },
            {
                $set: {
                    image: imageBuffer,
                    contentType: contentType || 'image/jpeg',
                    links: links || { instagram: '', facebook: '' }
                }
            },
            { new: true }
        );

        if (!userProfil) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User updated", data: userProfil });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du profil utilisateur', error });
    }
};




module.exports = { profilUser, addProfil, updateProfil };