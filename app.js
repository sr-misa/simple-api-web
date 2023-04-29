const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const config = require('config');

//Crear una instancia de express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static('public'));
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan habilitado...');
}

const usuarios = [
 {id:1, nombre:'Ramoncito'},
 {id:2, nombre:'Dierracho'},
 {id:3, nombre:'Ramipro'},
 {id:4, nombre:'Mac Pepe'},
 {id:5, nombre:'Tito Perez'},
 {id:6, nombre:'Macks'},
 {id:7, nombre:'DOCA'}
];
app.get('/ruta_usuarios', function (req, res) {/*acciones*/});
app.get('/ruta_usuarios', (req, res) => {
 //res.send('Ejemplo');
 res.send(usuarios);
})

app.get('/ruta_usuarios/:id', (req, res) => {
 res.send(req.params.id);
})

app.get('/ruta_usuarios/:param1/:param2', (req, res) => {
 res.send(req.params.param1);
 //res.send(req.params.param2);
})

//localhost:3000/ruta/param1/param2/?nombre=ejemplo&single=y
app.get('/ruta_usuarios/:param1/:param2', (req, res) => {
 res.send(req.query);
 //{ nombre: 'ejemplo', single: 'y' }
})

app.post('/ruta_usuarios', (req, res) => {
 if(!req.body.nombre || req.body.nombre.length <= 2){
 res.status(400).send('Debe ingresar un nombre con 3 letras como minimo');
 return;
 }
 const usuario = {
 id: usuarios.lenght + 1,
 nombre: req.body.nombre
 };
 usuarios.push(usuario);
 res.send(usuario);
});

app.post('/ruta_usuarios', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Escuchando desde el puerto ${port}...`);
});