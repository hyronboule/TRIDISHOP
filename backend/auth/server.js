const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoutes.js');
dotenv.config()

//routes
app.use("/", authRouter)

// Démarrer le serveur
app.listen(8081, () => {
  console.log('Le service d\'authentification est en cours d\'exécution sur le port 8081');
});