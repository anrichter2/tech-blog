const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for making a new post with withAuth middleware to check that user is logged in
router.post('/', withAuth, async (req, res) => {
    try {
      // Create a new post using the body from the POST fetch request from newPost.js and the user_id in the session cookie
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status.json(err);
    };
});

// PUT route for updating a post with withAuth middleware to check that user is logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update a post where the id matches the url parameter using the body from the PUT fetch request from updatePost.js
    const updatePost = await Post.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        }
      });

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  };
});

// DELETE route for deleting a post with withAuth middleware to check that user is logged in
router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Delete post where the post id and user_id match
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        // If no post found with provided info provide message
        if (!postData) {
          res.status(404).json({ message: 'No project found with this id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;