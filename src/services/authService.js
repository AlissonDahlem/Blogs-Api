const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'missingFields';
      throw e;
    }

    return value;
  },

  login: async (email, password) => {
    const user = await db.User.findOne({
      attributes: { exclude: ['displayName', 'image', 'createdAt', 'updatedAt'] },
      where: { email },
    });

    if (!user || user.password !== password) {
      const e = new Error('Invalid fields');
      e.name = 'missingFields';
      throw e;
    }

    const { passwordHash, ...userWithoutPassword } = user.toJSON();

    const token = jwtService.createToken(userWithoutPassword);
    return token;
  },

  validateToken: (token) => {
    const userID = jwtService.validateToken(token);

    return userID;
  },
};

module.exports = authService;