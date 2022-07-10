const boom = require('@hapi/boom');
const { models } = require('../drivers/MySQL/sequelize');
const { Op } = require('sequelize');
class ProductService {
    constructor() {}

    async findLike(data) {
        let category = {};
        if (data.category != null) {
            filter = {
                name: { [Op.eq]: data.category}
            }
        } else {category = null};

        try {
            const rta = await models.product.findAll({
                include: [{
                    model: models.category,
                    as: 'category',
                    attributes: { exclude: ['id'] },
                    where: category,
                    right: true
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