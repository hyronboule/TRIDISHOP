const express = require('express');
const app = express();
const { connectDBProfil } = require('./config/db.js');
const bodyParser = require('body-parser');
const profilRouter = require('./routes/ProfilRoutes')
const dotenv = require('dotenv');

dotenv.config()

connectDBProfil();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/",profilRouter)

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
