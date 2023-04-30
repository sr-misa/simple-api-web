const express = require('express');
const ruta = express.Router();
const Joi = require('joi');

//USUARIOS
const usuarios = [
    {id:1, nombre:'Ramoncito'},
    {id:2, nombre:'Dierracho'},
    {id:3, nombre:'Ramipro'},
    {id:4, nombre:'Mac Pepe'},
    {id:5, nombre:'Tito Perez'},
    {id:6, nombre:'Macks'},
    {id:7, nombre:'DOCA'}
];

//VALIDACIÓN
function existeUsuario(id){
    return (usuarios.find(e => e.id === parseInt(id)));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string()
        .min(3)
        .required()
    });
    return (schema.validate({nombre: nom}));
}

//GET
ruta.get('/', (req, res) => {
    res.send(usuarios);
})

ruta.get('/:id', (req, res) => {
    res.send(req.params.id);
})

//POST
ruta.post('/', (req, res) => {
    const schema = Joi.object({
        nombre: Joi.string()
        .min(3)
        .required()
    });
    const {error, value} = schema.validate({nombre: req.body.nombre});
    if(!error){
        const usuario = {
            id: usuarios.lenght + 1,
            nombre: req.body.nombre
        };
        usuarios.push(usuario);
        res.send(usuario);
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//PUT
ruta.put('/:id', (req, res) => {
    const usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('Usuario no se encuentra');
        return;
    }
    const {error, value} = validarUsuario(req.body.nombre);
    if (!error){
        usuario.nombre = value.nombre;
        res.send(usuario);
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//DELETE
ruta.delete('/:id', (req, res) => {
    const usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('Usuario no se encuentra');
        return;
    }
    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
    res.send(usuario);
    return;
});

//EXPORTAR RUTAS
module.exports = ruta;