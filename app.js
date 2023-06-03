const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(function (req, res, next) {
  setTimeout(next, 500);
});

app.use(
  cors({
    origin: '*',
  })
);
app.use(
  express.json({
    limit: '5kb',
  })
);
app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
