const router = require('express').Router();

const apiroutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiroutes);

module.exports = router