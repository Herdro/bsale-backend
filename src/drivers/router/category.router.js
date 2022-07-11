const express = require('express');

const { CategoryService } = require('../../useCases');

const router = express.Router();
const service = new CategoryService();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const product = await service.findLike();
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
