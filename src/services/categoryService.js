const Joi = require('joi');
const db = require('../database/models');

const categoryService = {
  validateBody: (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      const e = new Error('"name" is required');
      e.name = 'missingFields';
      throw e;
    }
    return value;
  },

  create: async (categoryName) => {
    const category = await db.Category.create({ name: categoryName });
    const { id, name } = category;
    return { id, name };
  },

  list: async () => {
    const categories = await db.Category.findAll({ attributes: {
      exclude: ['createdAt', 'updatedAt'] } });
    return categories;
  },

};

module.exports = categoryService;