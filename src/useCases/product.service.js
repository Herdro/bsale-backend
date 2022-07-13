const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../drivers/MySQL/sequelize");

class ProductService {
  constructor() {}

  async findLike(data) {
    let category = {};

    if (data.category != null) {
      category = {
        name: { [Op.eq]: data.category },
      };
    } else {
      category = null;
    }

    const options = {
      include: [
        {
          model: models.category,
          as: "category",
          attributes: { exclude: ["id"] },
          where: category,
          right: true,
        },
      ],
      attributes: { exclude: ["categoryId"] },
      where: "",
    };

    const {
      limit,
      nameOrder,
      priceOrder,
      priceMax,
      priceMin,
      discount,
      search,
    } = data;

    let { page } = data;

    if (limit) {
      if (page < 1 || page == null) {
        page = 1;
      }
      options.limit = Number(limit);
      options.offset = (page - 1) * options.limit;
    }

    if (nameOrder) {
      options.order = [["name", nameOrder]];
    }

    if (priceOrder) {
      options.order = [["price", priceOrder]];
    }

    if (discount) {
      options.order = [["discount", discount]];
    }

    if (priceMin && priceMax) {
      options.where = {
        [Op.and]: [
          { price: { [Op.lte]: priceMax } },
          { price: { [Op.gte]: priceMin } },
        ],
      };
    } else {
      if (priceMax) {
        options.where = { price: { [Op.lte]: priceMax } };
      }

      if (priceMin) {
        options.where = { price: { [Op.gte]: priceMin } };
      }
    }

    if (search) {
      options.where = { name: { [Op.like]: `%${search}%` } };
    }

    try {
      const rta = await models.product.findAll(options);
      return rta;
    } catch (error) {
      return boom.badRequest(error);
    }
  }
}

module.exports = ProductService;
