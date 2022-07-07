const express = require('express');
const { config } = require('../config/config');
const routerApi = require('./domains/router');

const { logErrors, errorHandler, boomErrorHandler } = require('./utils/middleware/error.handler');

const app = express();

const { port } = config;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`bsale app listening on port ${port}!`);
});
