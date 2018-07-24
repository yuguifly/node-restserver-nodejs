const express = require('express');
const app = express(); //para poder usar la parte de express
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;