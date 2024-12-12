const { default: mongoose } = require("mongoose");
const { getGfs } = require("../config/db");
const dotenv = require('dotenv');
dotenv.config()

const recoveryFile = async (nameFile) => {
  try {
      if (!nameFile) {
          return "echec nameFile's undefined";
      }

      const gfs = getGfs(); 

      const files = await gfs.find({ filename: nameFile }).toArray();

      if (files.length > 0) {
          const fileUrl = `${process.env.URL_FILE}${nameFile}`;
          return { fileUrl, ...files[0] };
      } else {
          return null;
      }
  } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
  }
};


const displayFilefunction = async (filename, res) => {
  try {
      const bucket = getGfs(); 
      const files = await bucket.find({ filename }).toArray();

      if (!files || files.length === 0) {
          return res.status(404).json({ message: 'File not found' });
      }

      const downloadStream = bucket.openDownloadStreamByName(filename);

      res.set({
          'Content-Type': 'model/gltf-binary',
          'Content-Disposition': `attachment; filename="file3D.glb"`
      });

      downloadStream.pipe(res);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


module.exports = {recoveryFile,displayFilefunction};