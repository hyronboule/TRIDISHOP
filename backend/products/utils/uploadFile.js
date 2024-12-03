const { getGfs } = require('../config/db');

// function for uploading files
const uploadFile = async (newFile, fileName, newProductInfo) => {
    try {
        const gfsBucket = getGfs();
       
        const file = newFile;

        if (!file) {
            throw new Error('No file uploaded');
        }
        const writestream = gfsBucket.openUploadStream(fileName);

       
        await new Promise((resolve, reject) => {
            writestream.on('finish', resolve); 
            writestream.on('error', reject); 
            writestream.write(file.buffer); 
            writestream.end(); 
        });

       
        await newProductInfo.save();
        
        return { msg: 'File uploaded and product saved' };

    } catch (err) {
        throw new Error(`File upload failed: ${err.message}`); 
    }
};

module.exports = {uploadFile}