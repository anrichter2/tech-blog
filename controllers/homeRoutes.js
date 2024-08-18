const router = require('express').Router();
const { User, Post } = require('../models/index');
const withAuth = require('../utils/auth');

// Route for displaying all posts on the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route for displaying an users personal dashboard page and their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = await userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }

    res.render('login');
});

// Route for sign-in page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }

    res.render('signup');
});

// Route for showing an individual post and comments
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    exclude: ['password']
                },
                // {
                //     model: Comment, might need to do findbypk for comments seperetly and pass to handlebars page or add a where clause
                // }
            ],
        });

        const post = postData.get({ plain: true });
        console.log('post', post);

        let statement;
        if (req.session.user_id === post.user_id) {
            statement = true
        } else {
            statement = false
        }

        res.render('post', {
            ...post,
            statement,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router