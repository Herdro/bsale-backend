const { product, productSchema } = require('./products.model');
const { category, categorySchema } = require('./category.model');

function setupModels(sequelize) {
  product.init(productSchema, product.config(sequelize));
  category.init(categorySchema, category.config(sequelize));

  product.associate(sequelize.models);
  category.associate(sequelize.models);
}

module.exports = setupModels;
