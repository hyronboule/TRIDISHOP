const express = require('express');
const app = express();
const dotenv = require('dotenv');
const productsRoutes = require('./routes/productsRoutes');
const { connectDBProducts } = require("./config/db");
const bodyParser = require('body-parser');

dotenv.config()
connectDBProducts()

// app.use(express.json());
app.use(bodyParser.json({ limit: '2400mb' }));
app.use(bodyParser.urlencoded({ limit: '2400mb', extended: true }));

//routes
app.use("/", productsRoutes)


// Démarrer le serveur
app.listen(8083, () => {
  console.log('Le service d\'authentification est en cours d\'exécution sur le port 8083');
});