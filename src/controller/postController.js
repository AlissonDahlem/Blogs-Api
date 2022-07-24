const postService = require('../services/postService');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = postService.validateBody(req.body);
    postService.validateCategoryIds(categoryIds);
    await postService.checkCategoryExists(categoryIds);
    const post = await postService.create(title, content, categoryIds, req.user);
    res.status(201).json(post);
  },

  list: async (_req, res) => {
    const posts = await postService.list();
    res.status(200).json(posts);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    await postService.checkPostIdExists(id);
    const post = await postService.getById(id);
    res.status(200).json(post);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const params = await postService.updateBodyValidate(req.body);
    await postService.checkPostIdExists(id);
    const post = await postService.getById(id);
    await postService.checkPostBelongsToUser(req.user, id, post);
    await postService.update(id, params);
    const updatedPost = await postService.getById(id);
    res.status(200).json(updatedPost);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await postService.checkPostIdExists(id);
    const post = await postService.getById(id);
    await postService.checkPostBelongsToUser(req.user, id, post);
    await postService.destroy(id);
    res.status(204).json();
  },

  searchByTerm: async (req, res) => {
    const { q } = req.query;
    const posts = await postService.searchByTerm(q);

    res.status(200).json(posts);
  },
};

module.exports = postController;