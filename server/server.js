require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('BD ONLINE');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//configuración de global de rutas
app.use(require('./routes/index'));




app.listen(process.env.PORT, () => {
    console.log('Escuchando: ', process.env.PORT);
});