const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const app = express();

app.get('/login', (req, res) => {

    res.json({
        ok: true,
    })
})

app.post('/login', (req,res)=>{
    let {email, password} = req.body;

    Usuario.findOne({email}, (err, user)=>{


        if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
        }

        if (!user || !password) return res.status(500).json({
            ok: false,
            err: {
                message: "Usuario o contraseña incorrectos"
            }
        });

        if(!bcrypt.compareSync(password, user.password)) 
            return res.status(500).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña incorrectos"
                }
            });

        let token = jwt.sign({user},  process.env.TOKEN_SEED, {expiresIn: process.env.TOKEN_EXPIRED});

        res.json({
            ok: true,
            user,
            token
        })


    })
})




module.exports = app;