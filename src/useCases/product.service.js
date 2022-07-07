const boom = require('@hapi/boom');
const { models } = require('../drivers/MySQL/sequelize');

class ProductService {
    constructor() {}

    async findLike() {
        try {
            const rta = await models.product.findAll({
                include: [{
                    model: models.category,
                    as: 'category',
                    attributes: { exclude: ['id'] }
                }],
                attributes: { exclude: ['categoryId'] }
            });
            return rta;            
        } catch (error) {
            return boom.badRequest(error);
        };
    };
};

module.exports = ProductService;