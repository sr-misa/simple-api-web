const express = require('express');
const morgan = require('morgan');
const students = require('./routes/students');

//Crear una instancia de express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
console.log('Morgan habilitado...');

app.use('/students', students);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando desde el puerto ${port}...`);
});