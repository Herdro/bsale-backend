const express = require('express');

const { ProductService }  = require('../../useCases/');
const validatorHandler  = require('../../utils/middleware/validator.handler');
const { filterSchema } = require('../../utils/schema/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res, next) => {
    try {
        const product = await service.findLike();
        res.json(product)
    } catch (error) {
        next(error)
    }
});

module.exports = router;
