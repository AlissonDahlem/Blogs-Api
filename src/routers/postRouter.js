const { Router } = require('express');

const postController = require('../controller/postController');
const authController = require('../controller/authController');

const router = Router();

router.use(authController.validateToken);
router.get('/search', postController.searchByTerm);
router.post('/', postController.create);
router.get('/', postController.list);
router.get('/:id', postController.getById);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);

module.exports = router;