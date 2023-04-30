const express = require('express');
const ruta = express.Router();
const reg = require('./register');

//GET
ruta.get('/', (req, res) => {
    res.send(reg.students.students);
});

ruta.get('/:id', (req, res) => {
    let [check, index] = reg.students.checkID(req.params.id);
    if(check){
        res.send(reg.students.read(req.params.id));
    }else{
        res.status(404).send('Usuario no se encuentra');
    }
});

//POST
ruta.post('/', (req, res) => {
    const {error, value} = reg.schemaStudent.validate({name: req.body.name, email: req.body.email, career: req.body.career});
    if(!error){
        if(reg.students.create(req.body.name, req.body.email, req.body.career)){
            res.send("Creado Correctamente");
        }else{
            res.send("Error, Correo Repetido");
        }
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//PUT
ruta.put('/:id', (req, res) => {
    let [check, index] = reg.students.checkID(req.params.id);
    if(!check){
        res.status(404).send('Usuario no se encuentra');
        return;
    }
    const {error, value} = reg.schemaStudent.validate({name: req.body.name, email: req.body.email, career: req.body.career});
    if (!error){
        if(reg.students.update(req.params.id, req.body.name, req.body.email, req.body.career)){
            res.send("Actualizado Correctamente");
        }else{
            res.send("Error, Correo Repetido");
        }
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//DELETE
ruta.delete('/:id', (req, res) => {
    let [check, index] = reg.students.checkID(req.params.id);
    if(!check){
        res.status(404).send('Usuario no se encuentra');
        return;
    }
    if(reg.students.delete(req.params.id)){
        res.send("Eliminado Correctamente");
    }
    return;
});

//EXPORTAR RUTAS
module.exports = ruta;