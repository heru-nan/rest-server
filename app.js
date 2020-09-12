const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const usuarioRoute = require("./routes/usuario.js");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw err;
    console.log(`base de datos onlines`);
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(usuarioRoute);

app.listen(process.env.PORT, function () {
  console.log(`server on ${process.env.PORT}`);
});
