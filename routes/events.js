const express = require('express');
const ruta = express.Router();
const reg = require('./register');

//GET
ruta.get('/', (req, res) => {
    res.send(reg.events.events);
});

ruta.get('/:id', (req, res) => {
    let [check, index] = reg.events.checkID(req.params.id);
    if(check){
        res.send(reg.events.read(req.params.id));
    }else{
        res.status(404).send('Evento no se encuentra');
    }
});

//POST
//event: id, title, date, hour, place, speaker name, and list of registered students
ruta.post('/', (req, res) => {
    const {error, value} = reg.schemaEvent.validate({title: req.body.title, date: req.body.date, hour: req.body.hour, place: req.body.place, speaker_name: req.body.speaker_name});
    if(!error){
        if(reg.events.create(req.body.title, req.body.date, req.body.hour, req.body.place, req.body.speaker_name)){
            res.send("Creado Correctamente");
        }else{
            res.send("Error. Día, Hora y Fecha repetidos");
        }
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//PUT
ruta.put('/:id', (req, res) => {
    let [check, index] = reg.events.checkID(req.params.id);
    if(!check){
        res.status(404).send('Evento no se encuentra');
        return;
    }
    const {error, value} = reg.schemaEvent.validate({title: req.body.title, date: req.body.date, hour: req.body.hour, place: req.body.place, speaker_name: req.body.speaker_name});
    if (!error){
        if(reg.events.update(req.params.id, req.body.title, req.body.date, req.body.hour, req.body.place, req.body.speaker_name)){
            res.send("Actualizado Correctamente");
        }else{
            res.send("Error. Día, Hora y Fecha repetidos");
        }
    }
    else{
        res.status(400).send(error.details[0].message);
    }
});

//DELETE
ruta.delete('/:id', (req, res) => {
    let [check, index] = reg.events.checkID(req.params.id);
    if(!check){
        res.status(404).send('Evento no se encuentra');
        return; 
    }
    if(reg.events.delete(req.params.id)){
        res.send("Eliminado Correctamente");
    }
    return;
});

//EXPORTAR RUTAS
module.exports = ruta;