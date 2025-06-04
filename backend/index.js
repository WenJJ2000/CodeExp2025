require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
const liveUpdate = require("./app/controller/user.controller").liveUpdate;

app.set("views", path.join(__dirname, "views"));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  liveUpdate((result) => {
    console.log("Live update received:", result);
  });
  console.log("Server is running on port " + process.env.PORT);
});

module.exports = app;
