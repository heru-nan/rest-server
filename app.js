const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/usuario", function (req, res) {
  res.json("hello, world");
});
// crear nuevos registros
app.post("/usuario", function (req, res) {
  let body = req.body;
  if (!body.nombre) {
    res.status(400).json({
      ok: false,
      mensaje: "el nombre es necesario",
    });
  } else {
    res.json({
      persona: body,
    });
  }
});
// actualizar nuevos registros
app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;

  res.json({ id });
});
app.delete("/usuario", function (req, res) {
  res.json("hello, world");
});

app.listen(process.env.PORT, function () {
  console.log(`server on ${process.env.PORT}`);
});
