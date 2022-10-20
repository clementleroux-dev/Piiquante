//// IMPORT ////
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

//// CONNECT DB ////
require("./mongodb");
/// mongo sanitize

//// SET HEADERS ////
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //access to the DB from anywhere
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //add the mentioned headers to the requests sent to our API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Methods
  next();
});

app.use(express.json()); //lets read json content of  body request

//// EXTENSION ///
app.use(limiter); // limit the number of request
app.use("/images", express.static(path.join(__dirname, "images"))); //img repertory
app.use(helmet());

//// ROUTES ////
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app; //export de l'app
