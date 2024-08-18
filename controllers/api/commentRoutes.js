const router = require('express').Router();
const { Comment } = require('../../models/index');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
    try {
        const newPost = await Comment.create({
            ...req.body,
            post_id: req.params.id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status.json(err);
    };
});

module.exports = router;