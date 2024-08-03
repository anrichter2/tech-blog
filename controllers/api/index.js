const router = require('express').Router();
const { User } = require('../../models/index');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);

module.exports = router