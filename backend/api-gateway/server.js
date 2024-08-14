const express = require('express');
const app = express();
const proxy = require("express-http-proxy")
const dotenv = require('dotenv');
dotenv.config()

// Routes
app.use("/api/auth",proxy(process.env.URL_AUTH))

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
