const router = require('express').Router();
const { User } = require('../../models/index');

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err); // Should this be 500
    };
});

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: {username: req.body.username}});

        if (!userData) {
            res.status(400).json({ message: "Couldn't find that username, please try again" }); // should this be 404
            return;
        };

        const userPassword = await userPassword.checkPassword(req.body.password);

        if(!userPassword) {
            res.status(400).json({ message: "Incorrect password, please try again"});
            return;
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "successfully logged in" });
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router