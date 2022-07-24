const Joi = require('joi');
const { Op } = require('sequelize');
const db = require('../database/models');

const postService = {
  validateBody: (body) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'missingFields';
      throw e; 
}
    
    return value;
  },

  validateCategoryIds: (array) => {
    if (array <= 0) {
      const error = new Error('"categoryIds" not allowed to be empty');
      error.name = 'missingFields';
      throw error;
    }
    array.forEach((num) => {
      if (typeof num !== 'number') {
        const error = new Error('"categoryIds" can only receive array of numbers');
        error.name = 'missingFields';
        throw error;
      } 
    });
  },

  checkCategoryExists: async (categoryIds) => {
    await Promise.all(categoryIds.map(async (id) => {
      const exists = await db.Category.findByPk(id);
      if (exists === null) {
        const error = new Error('"categoryIds" not found');
        error.name = 'missingFields';
        throw error;
      }
    }));
  },

  create: async (title, content, categoryIds, userId) => {
    const { id, updated, published } = await db.BlogPost.create({
      title,
      content,
      userId,
      updated: new Date(),
      published: new Date(),
    });
    for (let i = 0; i < categoryIds.length; i += 1) {
      db.PostCategory.create({ postId: id, categoryId: categoryIds[i] });
    }
    return { id, title, content, userId, updated, published };
  },

  list: async () => {
    const posts = await db.BlogPost.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: db.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return posts;
  },

  checkPostIdExists: async (id) => {
    const exists = await db.BlogPost.findByPk(id);
    if (!exists) {
      const error = new Error('Post does not exist');
      error.name = 'userDoesNotExist';
      throw error;
    }
  },

  getById: async (id) => {
    const posts = await db.BlogPost.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: db.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return posts;
  },

  updateBodyValidate: async (body) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      error.message = 'Some required fields are missing';
      error.name = 'missingFields';
      throw error;
    }
    return value;
  },

  checkPostBelongsToUser: async (UserIdRequest, postId, post) => {
    const { id, userId } = post;
    if (UserIdRequest !== userId && id !== postId) {
      const error = new Error('Unauthorized user');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },

  update: async (id, params) => {
    await db.BlogPost.update(
      params, { where: { id } },
    );
  },

  destroy: async (id) => {
    await db.PostCategory.destroy({
      where: { postId: id },
    });
    await db.BlogPost.destroy({
      where: { id },
    });
  },

  searchByTerm: async (term) => {
    const posts = await db.BlogPost.findAll({
      where: { [Op.or]: [
        { title: { [Op.substring]: term } },
        { content: { [Op.substring]: term } },
    ] },
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  },
};

module.exports = postService;