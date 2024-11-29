// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// dotenv.config();

// let mongoServer; 
// const DATABASE_URI = process.env.DATABASE_URI;

// const connectDBAuth = async (useMemoryServer = false) => {
//     try {
//         let uri;

//         if (useMemoryServer) {
           
//             mongoServer = await MongoMemoryServer.create();
//             uri = mongoServer.getUri();
//             console.log("Connected to MongoDB Memory Server");
//         } else {
//             // Utiliser la base réelle
//             uri = DATABASE_URI;
//             console.log("Connected to real MongoDB");
//         }

//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     } catch (error) {
//         console.error("MongoDB connection error:", error.message);
//         process.exit(1);
//     }
// };

// const disconnectDBAuth = async () => {
//     try {
//         await mongoose.disconnect();
//         if (mongoServer) {
//             await mongoServer.stop();
//             console.log("MongoDB Memory Server stopped");
//         }
//     } catch (error) {
//         console.error("MongoDB disconnection error:", error.message);
//     }
// };

// const clearDatabase = async () => {
//     try {
//         const collections = mongoose.connection.collections;
//         for (const key in collections) {
//             await collections[key].deleteMany(); 
//         }
//         console.log("Database cleared");
//     } catch (error) {
//         console.error("Error clearing database:", error.message);
//     }
// };

// module.exports = { connectDBAuth, disconnectDBAuth, clearDatabase };
