const express = require('express');
const router = express.Router();

const Config = require('./../models/Config');

router.get('/', async (req, res) => {
  try {
    const config = await Config.findOne();
    res.status(200).send({ success: true, config: config });
  } catch (err) {
    res.status(404).send({ success: false, error: 'Cannot find config document!' });
  }
});
module.exports = router;
