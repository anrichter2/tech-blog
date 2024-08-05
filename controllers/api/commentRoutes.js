const router = require('express').Router();
const { Comment } = require('../../models/index');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Comment.create({
            ...req.body,
            user_id: req.session.user_id, // Dont need this
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status.json(err);
    };
});

module.exports = router;