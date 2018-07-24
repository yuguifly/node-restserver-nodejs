const express = require('express');

const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express(); //para poder usar la parte de express

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({ //error interno bd
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrecta'
                }
            });
        };

        if (!bycript.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Usuario o (contraseña) incorrecta`
                }
            });
        }

        //ORIGINAL DE LA WEB
        // jwt.sign({
        //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
        //     data: 'foobar'
        //   }, 'secret');

        let token = jwt.sign({
            usuario: usuarioBD
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); //expiresIn: 60 * 60 => expira en 1h expiresIn: 60 * 60 *24 *30 => expira en 30 dias
        res.json({
            ok: true,
            usuario: usuarioBD,
            token: token
        });
    })




});

module.exports = app;