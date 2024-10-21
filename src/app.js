const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const { initDB } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

initDB().then(() => {
  console.log('Database initialized');
});

module.exports = app;
