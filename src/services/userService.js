const Joi = require('joi');
const db = require('../database/models');
const postService = require('./postService');

const userService = {
  validadeBody: async (body) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });
    const { error, value } = schema.validate(body);

    if (error) {
      error.name = 'missingFields';
      throw error;
    }

    return value;
  },

  checkEmailExists: async (email) => {
    const checkEmail = await db.User.findOne({
      attributes: { exclude: ['displayName', 'image', 'createdAt', 'updatedAt'] },
      where: { email },
    });
    if (checkEmail) {
      const error = new Error('User already registered');
      error.name = 'EmailAlreadyInUse';
      throw error;
    }
  },

  register: async (displayName, email, password, image) => {
    console.log('vai cadastrar');
    const user = await db.User.create({
      displayName,
      email,
      password,
      image,
    });
    console.log('cadastrou');
    return user;
  },

  list: async () => {
    const users = await db.User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  checkIfExists: async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) {
      const error = new Error('User does not exist');
      error.name = 'userDoesNotExist';
      throw error;
    }
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id, { attributes: { exclude: ['password'] } });
    return user;
  },

  destroy: async (id) => {
    const userPosts = await db.BlogPost.findAll({
      where: { userId: id },
      attributes: { exclude: ['userId', 'title', 'content', 'published', 'updated'] },
    });
    await userPosts.map((post) => postService.destroy(post.id));
    await db.User.destroy({
      where: { id },
    });
},
};

module.exports = userService;