const Joi = require('joi');

const price = Joi.number().integer();
const discount = Joi.number().integer();
const category = Joi.string();

const filterSchema = Joi.object({
    price,
    discount,
    category,
});

module.exports = {
    filterSchema
}