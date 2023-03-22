const express = require('express');
const router = express.Router();
const posts = require('../model/posts');
const { handleSuccess, handleError } = require('../status/status');

router.get('/posts', async(req, res) => {
  const allPosts = await posts.find();
  handleSuccess(res, allPosts);
});

router.post('/posts', async(req, res) => {
  try {
    const { body } = req;
    if(body.content !== undefined) {
      const newPost = await posts.create(
        {
          name: body.name,
          content: body.content,
          tags: body.tags,
          type: body.type
        }
      );
      handleSuccess(res, newPost);  
    } else {
      handleError(res);
    }
  } catch(error) {
    handleError(res, error);
  }
});

router.delete('/posts', async(req, res) => {
  const deletePosts = await posts.deleteMany({});
  handleSuccess(res, deletePosts);
});

router.delete('/posts/:id', async(req, res) => {
  try {
    const id = req.url.split('/').pop();
    await posts.findByIdAndDelete(id);
    handleSuccess(res, null);
  } catch (err) {
    handleError(res, err);
  }
});

router.patch('/posts/:id', async(req, res) => {
  try {
    const { body } = req;
    const id = req.url.split('/').pop();
    if (body.content) {
      const editContent = {
        content: body.content,
      };
      const editPost = await posts.findByIdAndUpdate(id, editContent);
      handleSuccess(res, editPost);
    } else {
      handleError(res);
    }
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = router;
