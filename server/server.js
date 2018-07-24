require('./config/config');
const express = require('express');
const mongoose = require('mongoose'); // conexión a mongo
const bodyParser = require('body-parser');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app.use(require('./routes/usuario')); // nos creamos index.js para importar los ficheros y hacemos referencia a index
//app.use(require('./routes/login'));
//Configuracion GLOBAL DE RUTAS
app.use(require('./routes/index'));

mongoose.connect(process.env.URLBD, (err, res) => {
    if (err) throw err;

    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto', process.env.PORT);
});