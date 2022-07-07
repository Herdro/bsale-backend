const express = require('express');

const ProductService = require('./products.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/', router);
    router.use('/product', ProductService);
};

module.exports = routerApi;
