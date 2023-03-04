const express = require('express');
const router = express.Router();

const Message = require('./../models/Message');

router.post('/', (req, res) => {
  console.log(req.body);
  const { body } = req;
  const { to, title, content, whenSend } = body;

  if (!to || !title || !content || !whenSend)
    return res.status(400).send({
      status: false,
      message: 'Missing to, title, content or whenSend key!',
    });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(to)) {
    return res.status(400).send({
      success: false,
      message: `Provided email is invalid: ${to}.`,
    });
  }

  const message = new Message({
    to,
    title,
    content,
    whenSend,
  });

  try {
    message.save();
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: `Cannot add new Message to the database! Mongoose: ${e}`,
    });
  }

  return res.status(201).send({ success: true, message });
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find({ isSent: false });
    res.status(200).send({ success: true, messages });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: 'Cannot retrive messages from server.',
    });
  }
});

router.get('/:id', async (req, res) => {
  const messageId = req.params.id;

  if (!messageId)
    return res
      .status(400)
      .send({ success: false, message: `Invalid messageId! ${messageId}` });

  try {
    const message = await Message.findOne({ _id: messageId }).exec();
    return res.status(200).send({ success: true, message });
  } catch (e) {
    return res.status(404).send({
      success: false,
      message: `Cannot retrive message with ${messageId}.`,
    });
  }
});

module.exports = router;
