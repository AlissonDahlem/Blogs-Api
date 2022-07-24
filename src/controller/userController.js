const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

const userController = {
  register: async (req, res) => {
    const { displayName, email, password, image } = await userService.validadeBody(req.body);
    console.log('passou validaçao body');

    await userService.checkEmailExists(email);
    console.log('passou validacao email');

    const user = await userService.register(displayName, email, password, image);
    console.log('registrou');

    const { passwordHash, ...userWithoutPassword } = user.toJSON();

    const token = await jwtService.createToken(userWithoutPassword);

    res.status(201).json({ token });
  },

  list: async (_req, res) => {
    const users = await userService.list();

    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    await userService.checkIfExists(id);
    const user = await userService.getById(id);
    res.status(200).json(user);
  },

  destroy: async (req, res) => {
    await userService.destroy(req.user);
    res.status(204).end();
  },
};

module.exports = userController;