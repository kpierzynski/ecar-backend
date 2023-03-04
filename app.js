const express = require('express');
const routes = require('./routes');

const app = express();

app.use(
  express.json({
    limit: '5kb',
  })
);
app.use('/api', routes);

module.exports = app;
