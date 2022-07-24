const { Router } = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = Router();

router.post('/', userController.register);
router.use(authController.validateToken);
router.get('/', userController.list);
router.get('/:id', userController.getById);
router.delete('/me', userController.destroy);

module.exports = router;