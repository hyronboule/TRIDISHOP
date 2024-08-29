const express = require('express');
const app = express();
const dotenv = require('dotenv');
const adminRouter = require('./routes/adminRoutes');
// const { connectDBAuth } = require("../auth/config/db.js");

dotenv.config()
// connectDBAuth()

app.use(express.json());
//routes
app.use("/", adminRouter)

// Démarrer le serveur
app.listen(8082, () => {
  console.log('Le service d\'authentification est en cours d\'exécution sur le port 8082');
});