const express = require('express');
const app = express();
const proxy = require("express-http-proxy")
const adminUser = require("./middlewares/middlewareGateway.js");
const dotenv = require('dotenv');
dotenv.config()

// Routes
app.use("/api/auth",proxy(process.env.URL_AUTH))
app.use("/api/admin",adminUser,proxy(process.env.URL_ADMIN))

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
