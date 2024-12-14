const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectDBService } = require('./config/db.js');
dotenv.config()


connectDBService()
const serviceRoutes = require('./routes/serviceRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",serviceRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
  });
  