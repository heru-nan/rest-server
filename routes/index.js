const express = require("express");

const app = express();

const usuarioRoute = require("./usuario.js");
const loginRoute = require("./login.js");

app.use(usuarioRoute);
app.use(loginRoute);

module.exports = app;