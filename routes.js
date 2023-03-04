const express = require('express');
const homeRouter = require('./routes/home');
const messageRouter = require('./routes/message');

const router = express.Router();

router.use('/', homeRouter);
router.use('/message', messageRouter);

module.exports = router;
