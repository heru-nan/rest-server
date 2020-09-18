const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const app = express();

app.get("/", function (req, res) {
  res.json({
    routes: ["/usuario"],
  });
});

app.get("/usuario", function (req, res) {
  let from = req.query.from || 0;
  let limit = req.query.limit || 5;
  let state = req.query.state;
  let filter;
  if (!state) {
    filter = {};
  } else {
    filter = { estado: state };
  }
  Usuario.find(filter, "nombre email estado")
    .skip(Number(from))
    .limit(Number(limit))
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count(filter, (err, count) => {
        res.json({
          ok: true,
          users,
          total: count,
        });
      });
    });
});

// crear nuevos registros
app.post("/usuario", function (req, res) {
  let body = req.body;
  let { nombre, email, password, role } = req.body;

  if(!nombre || !email || !password){
    return res.status(400).json({
      ok: false,
      err: {message: "Solicitud de usuario incompleta"}
    });
  }

  let user = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    // user.password = null;

    res.json({
      ok: true,
      user,
    });
  });
});
// actualizar nuevos registros
app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        user,
      });
    }
  );
});

app.delete("/usuario/:id", function (req, res) {
  let { id } = req.params;

  let changes = {
    estado: false,
  };

  Usuario.findByIdAndUpdate(id, changes, { new: true }, (err, deleteUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!deleteUser) {
      return res.status(400).json({
        ok: false,
        err: { message: "Usuario no Encontrado" },
      });
    }

    res.json({
      ok: true,
      user: deleteUser,
    });
  });
});

module.exports = app;
