const { getGfs } = require('../config/db');

// Fonction utilitaire pour uploader un fichier
const uploadFile = async (newFile, fileName, newProductInfo) => {
    try {
        const gfsBucket = getGfs(); // Récupère l'instance GridFS
        // const gfs = getGfs(); // Récupère l'instance GridFS
       
        const file = newFile;

        if (!file) {
            throw new Error('No file uploaded'); // Lance une erreur si aucun fichier n'est uploadé
        }

        // Crée un stream pour écrire le fichier dans GridFS
        
        // const writestream = gfs.createWriteStream({
        //     filename: fileName,
        //     bucketName: 'fileProducts', // Nom du bucket GridFS
        // });
        
        const writestream = gfsBucket.openUploadStream(fileName);

        // Promesse pour gérer l'événement 'finish' du stream
        await new Promise((resolve, reject) => {
            writestream.on('finish', resolve); // Résout la promesse quand le fichier est écrit
            writestream.on('error', reject); // Rejette la promesse en cas d'erreur
            writestream.write(file.buffer); // Écrit le fichier dans le stream
            writestream.end(); // Termine le stream
        });

        // Sauvegarde les informations du produit après l'upload du fichier
        await newProductInfo.save();
        
        return { msg: 'File uploaded and product saved' }; // Retourne un message de succès

    } catch (err) {
        throw new Error(`File upload failed: ${err.message}`); // Lance une erreur en cas de problème
    }
};

module.exports = {uploadFile}