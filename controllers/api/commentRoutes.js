const router = require('express').Router();
const { Comment } = require('../../models/index');
const withAuth = require('../../utils/auth');

// POST route for making a new comment with withAuth middleware to check that user is logged in
router.post('/:id', withAuth, async (req, res) => {
    try {
        // Create a new comment using the body from the POST fetch request from commentPost.js and the url parameter of id
        const newPost = await Comment.create({
            ...req.body,
            user_name: req.session.username,
            post_id: req.params.id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;