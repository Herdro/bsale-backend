const Joi = require('joi');

const price = Joi.number().integer();
const category = Joi.string();
const search = Joi.string();
const order = Joi.string().valid('ASC', 'DESC');
const limit = Joi.number().integer();
const page = Joi.number().integer();

const filterSchema = Joi.object({
  priceMax: price,
  priceMin: price,
  discount: order,
  category,
  nameOrder: order,
  priceOrder: order,
  limit,
  page,
  search
});

module.exports = {
  filterSchema,
};
