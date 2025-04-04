const express = require('express');
const app = express();
const cors = require('cors');
const proxy = require("express-http-proxy")
const adminUser = require("./middlewares/middlewareGateway.js");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()

const allowedOrigins = [
  // process.env.ORIGIN, 
  process.env.ORIGIN_DOMAIN];

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '2400mb' }));
app.use(bodyParser.urlencoded({ limit: '2400mb', extended: true }));


// Routes
app.use("/api/auth",proxy(process.env.URL_AUTH))
app.use("/api/admin",adminUser,proxy(process.env.URL_ADMIN))
app.use("/api/products",proxy(process.env.URL_PRODUCTS,{parseReqBody: false}))
app.use("/api/profil",proxy(process.env.URL_PROFIL,{parseReqBody: false}))
app.use("/api/service",proxy(process.env.URL_SERVICE))

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur ${process.env.ORIGIN_DOMAIN}`);
});
