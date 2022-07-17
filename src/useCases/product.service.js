const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../drivers/MySQL/sequelize");

class ProductService {
  constructor() {}

  async findLike(data) {

    // Configuración filtrado de producto con tabla relacionada de categoría
    let category = {};

    if (data.category != null) {
      category = {
        name: { [Op.eq]: data.category },
      };
    } else {
      category = null;
    }

    // Configuiración base para relacionar tabla de productos con categorías
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

    // Extracción de query params
    const {
      limit,
      nameOrder,
      priceOrder,
      priceMax,
      priceMin,
      discount,
      search,
    } = data;

    // Extracción y configuración de query params de paginación
    let { page } = data;

    if (limit) {
      if (page < 1 || page == null) {
        page = 1;
      }
      options.limit = Number(limit);
      options.offset = (page - 1) * options.limit;
    }

    // Configuración de ordenamiento por nombre
    if (nameOrder) {
      options.order = [["name", nameOrder]];
    }

    // Configuración de ordenamiento por precio
    if (priceOrder) {
      options.order = [["price", priceOrder]];
    }

    // Configuración de ordenamiento por cantidad de descuento
    if (discount) {
      options.order = [["discount", discount]];
    }

    // Configuración de filtro por cantidad maxima o minima de precio
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

    // Configuración de busqueda por nombre de producto
    if (search) {
      options.where = { name: { [Op.like]: `%${search}%` } };
    }

    // Aplicación de consulta a sequelize
    try {
      const rta = await models.product.findAll(options);
      return rta;
    } catch (error) {
      return boom.badRequest(error);
    }
  }
}

module.exports = ProductService;
