const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: '5kb',
  })
);
app.use('/api', routes);

module.exports = app;
