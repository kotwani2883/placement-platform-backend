const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
//DB config
const DB = require("./database/connectDB");
//App Config
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(Cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//db connection
DB();

app.get("/", (req, res) => {
  res.send("Server up and running on required Port");
});

app.listen(port, () => console.log(`Listning on localhost: ${port}`));
