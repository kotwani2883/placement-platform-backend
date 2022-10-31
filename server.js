const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const cookie = require("cookie-parser");

//DB config
const DB = require("./database/connectDB");

//requiring the routes

const userRoute = require("./routes/user");
const protectedRoute = require("./routes/protected");

//App Config
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
require("dotenv").config();

//Middlewares
app.use(express.json());
app.use(Cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookie());

//db connection
DB();

// api calls
app.use(userRoute);
app.use(protectedRoute);

// listening
app.listen(port, () => console.log(`Listning on localhost: ${port}`));
