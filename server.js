const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
//DB config
const DB = require("./database/connectDB");
//App Config
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(Cors());
//db connection
DB();

app.listen(port, () => console.log(`Listning on localhost: ${port}`));
