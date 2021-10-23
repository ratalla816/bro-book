const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');
const dudeRoutes = require('./dude-routes');

router.use('/thought', thoughtsRoutes);
router.use('/dude', dudeRoutes);

module.exports = router;
