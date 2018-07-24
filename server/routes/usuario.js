const express = require('express');

const bycript = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();
app.get('/usuario', function(req, res) {
    // res.json('get usuario')
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    //Usuario.find({}) //todos
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //respuesta del servicio
            //Usuario.count({ google: true }, (err, conteo) => { // count con restricciones
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuario,
                    cuantos: conteo
                })
            })

        })
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bycript.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioBD.password = null; // pondriamos el campo a null pero usando la funcion  de modificar toJSON de usuarioShema podemos borrarlo

        //respuesta del servicio
        res.json({
            ok: true,
            usuario: usuarioBD
        });

    });


    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //let body = req.body; enviamos todo el body
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); // enviamos solo lo que nos interesa usando la libreria underscore

    //FORMA 1 DE UPDATE
    // Usuario.finById(id, (err, usuarioBD)=>{
    //     usuario.save;
    // })

    //FORMA 2
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //respuesta del servicio
        res.json({
            ok: true,
            usuario: usuarioBD

        });
    })

});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //eliminamos fisicamente

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

});

module.exports = app;