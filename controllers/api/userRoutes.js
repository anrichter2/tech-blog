const router = require('express').Router();
const { User } = require('../../models');

// POST route for creating a new user in the database
router.post('/signup', async (req, res) => {
    try {
        // Create new user with data from the body of a POST fetch request that was sent from signup.js
        const userData = await User.create(req.body);

        // save the user id, username and that logged in is true in the session cookie
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;

            res.status(200).json(userData);
        });

    } catch (err) {
        // status code of 400 because bad request
        res.status(400).json(err);
    };
});

// POST route for finding an user account that already exists in the database
router.post('/login', async (req, res) => {
    try{
        // Find user data from the username provided by the POST fetch request sent from login.js
        const userData = await User.findOne({ where: {username: req.body.username}});

        // If no user data found return message
        if (!userData) {
            res.status(404).json({ message: "Couldn't find that username, please try again" }); 
            return;
        };

        // Check that the password provided matches the password stored in the database
        const userPassword = await userData.checkPassword(req.body.password);

        // If password doesn't match send message
        if(!userPassword) {
            res.status(400).json({ message: "Incorrect password, please try again"});
            return;
        };

        // save the user id, username and that logged in is true in the session cookie
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;

            res.json({ user: userData, message: "successfully logged in" });
        });

    } catch (err) {
        res.status(400).json(err)
    }
});

// POST route for logging out of user account
router.post('/logout', (req, res) => {
    // If logged in deletes information in the session cookie
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});

module.exports = router