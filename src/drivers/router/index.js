const express = require('express');

const ProductService = require('./products.router');
const CategoryService = require('./category.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/', router);
    router.use('/product', ProductService);
    router.use('/category', CategoryService);
};

module.exports = routerApi;
