const express = require("express");
const bodyParser = require("body-parser");
//const config = require("./config");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require('./routes');

const app = express();


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

app.use(routes);

app.listen(process.env.PORT, function () {
  console.log(`server on ${process.env.PORT}`);
});
