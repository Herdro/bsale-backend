const express = require('express');
const cors = require('cors');
const { config } = require('../config/config');
const routerApi = require('./drivers/router');

const { logErrors, errorHandler, boomErrorHandler } = require('./utils/middleware/error.handler');

const app = express();

const { port } = config;

app.use(express.json());
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`bsale app listening on port ${port}!`);
});
