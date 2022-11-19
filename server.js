const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser");

//DB config
const DB = require("./database/connectDB");
let morgan = require("morgan"); // middleware to log http requests
//requiring the routes

//App Config
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
require("dotenv").config();

//Middlewares
app.use(express.json());
// app.use(
//   cors({
//     origin: "https://satyampgt4.github.io/placement-plateform-frontend/",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookie());
app.use(morgan("dev"));
//db connection
DB();

// routes
app.use("/api/auth/", require("./routes/auth.router"));
app.use("/api/user", require("./routes/user.router"));
app.use("/api/announcement", require("./routes/announcement.router"));
app.use("/api/apply", require("./routes/apply.router"));
app.use("/api/placements", require("./routes/placements.router"));
app.use("/api/company", require("./routes/company.router"));
app.use("/api/apply", require("./routes/apply.router"));

// listening
app.listen(port, () => console.log(`Listning on localhost: ${port}`));
