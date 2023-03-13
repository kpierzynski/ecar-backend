const express = require('express');
const homeRouter = require('./routes/home');
const messageRouter = require('./routes/message');
const configRouter = require('./routes/config');

const router = express.Router();

router.use('/', homeRouter);
router.use('/message', messageRouter);
router.use('/config', configRouter);

module.exports = router;
