const boom = require('@hapi/boom');
const { models } = require('../drivers/MySQL/sequelize');

class CategoryService {
  constructor() {}

  async findLike() {
    // APlicación de consulta a sequelize
    try {
      const rta = await models.category.findAll({
        attributes: { exclude: ['id'] },
      });
      return rta;
    } catch (error) {
      return boom.badRequest(error);
    }
  }
}

module.exports = CategoryService;
