const express = require('express');
const router = express.Router();

const Message = require('./../models/Message');

const { mailTask } = require('./../tasks');

router.post('/', (req, res) => {
  console.log(req.body);
  const { body } = req;
  const { to, title, content, whenSend, registration } = body;

  if (!to || !title || !content || !whenSend || !registration)
    return res.status(400).send({
      status: false,
      error: 'Missing to, title, content or whenSend key!',
    });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(to)) {
    return res.status(400).send({
      success: false,
      error: `Provided email is invalid: ${to}.`,
    });
  }

  const message = new Message({
    to,
    title,
    content,
    whenSend,
    registration,
    created: Date.now(),
  });

  try {
    message.save();
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: `Cannot add new Message to the database! Mongoose: ${e}`,
    });
  }

  return res.status(201).send({ success: true, message });
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).send({ success: true, messages });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: 'Cannot retrive messages from server.',
    });
  }
});

router.get('/:id', async (req, res) => {
  const messageId = req.params.id;

  // is this necessary? empty id wont be passed to this route
  if (!messageId)
    return res.status(400).send({ success: false, message: `Invalid messageId! ${messageId}` });

  try {
    const message = await Message.findOne({ _id: messageId }).exec();
    return res.status(200).send({ success: true, message });
  } catch (e) {
    return res.status(404).send({
      success: false,
      error: `Cannot retrive message with ${messageId}.`,
    });
  }
});

router.post('/:id/send', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findOne({ _id: messageId }).exec();
    message.isSent = false;
    message.whenSend = Date.now();
    await message.save();
    mailTask.start();

    return res.status(200).send({ success: true });
  } catch (e) {
    return res.status(404).send({
      success: false,
      error: `Cannot retrive message with ${messageId}.`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.deleteOne({ _id: messageId });
    return res.status(200).send({ success: true });
  } catch (e) {
    return res.status(404).send({
      success: false,
      error: `Cannot delete provided element: ${messageId}`,
    });
  }
});

module.exports = router;
