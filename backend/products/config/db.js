const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Grid = require("gridfs-stream");
const { GridFSBucket } = require('mongodb');

dotenv.config();
// let gft;
let gfsBucket;

const DATABASE_URI = process.env.DATABASE_URI;

const connectDBProducts = async () => {
    try {
        // connect to the database 
        await mongoose.connect(DATABASE_URI);
        console.log("MongoDB Connected");

        // init GridFS
        
         const db = mongoose.connection.db;
         const mongoDriver = mongoose.mongo;
         gfsBucket = new GridFSBucket(db, { bucketName: 'fileProducts' });
 
         console.log("GridFS Initialized");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

const getGfs = () => {
    if (!gfsBucket) {
        throw new Error("GridFS not initialized");
    }
    return gfsBucket;
};


module.exports = { connectDBProducts, getGfs  };