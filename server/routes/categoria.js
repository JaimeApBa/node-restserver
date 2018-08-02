const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

let Usuarios = require('../models/usuario');

// ============================
// Mostrar todas las categorias
// ============================

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find()
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias

            });

        });

});


// ============================
// Mostrar categorias por ID
// ============================

app.get('/categoria/:id', verificaToken, (req, res) => {

    Categoria.findById(req.params.id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no es correcto'
                }
            });

        }

        res.json({
            ok: true,
            categoriaDB

        });


    });

});


// ============================
// Crear Categoria
// ============================

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });



});


// ============================
// Actualizar Categoria
// ============================

app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });



});

// ============================
// Borrar Categoria
// ============================

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no existe'
                }
            });

        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });

    });

});



module.exports = app;