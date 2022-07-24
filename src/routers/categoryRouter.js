const { Router } = require('express');

const categoryController = require('../controller/categoryController');
const authController = require('../controller/authController');

const router = Router();

router.use(authController.validateToken);
router.post('/', categoryController.create);
router.get('/', categoryController.list);

module.exports = router;