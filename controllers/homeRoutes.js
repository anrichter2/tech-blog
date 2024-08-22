const router = require('express').Router();
const { User, Post, Comment} = require('../models/index');
const withAuth = require('../utils/auth');

// GET route for displaying all posts on the homepage
router.get('/', async (req, res) => {
    try {
        // Find all post data for the homepage
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // render the homepage.handlebars page and pass it the data we retrieved to be displayed on the page
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for displaying an users personal dashboard page and their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the user's data by the primary key provided by the session cookie
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = await userData.get({ plain: true });

        // render the dashboard.handlebars page and pass user data
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
    // if already logged in redirect to user dashboard page
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }

    // If not logged in render the login.handlebars page
    res.render('login');
});

// Route for sign-in page
router.get('/signup', (req, res) => {
    // if already logged in redirect to user dashboard page
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }

    // If not logged in render the signup.handlebars page
    res.render('signup');
});

// GET route for showing an individual post page and comments
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        // Find the post data by primary key using the id provided by the id parameter in the url
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    exclude: ['password']
                },
                {
                    model: Comment,
                    required: false,
                    attributes: ['comment_text', 'date_commented']
                }
            ],
        });

        const post = postData.get({ plain: true });

        // true or false statement used in an if statement on the post.handlebars page to determine what parts of the page to render
        let statement;
        if (req.session.user_id === post.user_id) {
            statement = true
        } else {
            statement = false
        }

        // render post.handlebars page and pass relevent data
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