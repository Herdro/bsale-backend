const boom = require('@hapi/boom');
const { models } = require('../drivers/MySQL/sequelize');

class CategoryService {
    constructor() {}

    async findLike() {
        try {
            const rta = await models.category.findAll({
                attributes: { exclude: ['id'] }
            });
            return rta;            
        } catch (error) {
            return boom.badRequest(error);
        };
    };
};

module.exports = CategoryService;