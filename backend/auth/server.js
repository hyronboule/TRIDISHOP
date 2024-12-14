const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoutes.js');
const { connectDBAuth } = require('./config/db.js');

dotenv.config()

connectDBAuth()

// Middleware pour parser les requêtes en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//routes
app.use("/", authRouter)

// Démarrer le serveur
app.listen(8081, () => {
  console.log('Le service d\'authentification est en cours d\'exécution sur le port 8081');
});