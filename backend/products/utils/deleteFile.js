const { getGfs } = require("../config/db");


const deleteFile = async (nameFile, res) => {
    try {
        let gfs = getGfs();
        const files = await gfs.find({ filename: nameFile }).toArray();

        if (files.length === 0) {
            throw new Error('File not found');
        } else {
            await gfs.delete(files[0]._id);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error with deletion', error: error.message });
    }
};



module.exports = {deleteFile}