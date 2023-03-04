const cron = require('node-cron');
const sendMessage = require('./sender');

const Message = require('./models/Message');

console.log('Tasks file initialized tasks.');

cron.schedule('* * * * *', async () => {
  const now = Date.now();

  try {
    const messages = await Message.find({
      isSent: false,
      whenSend: { $lt: now },
    });

    messages.forEach((message) => {
      console.log(message);
      const { to, title, content } = message;
      sendMessage({ to, title, content });
      try {
        message.isSent = true;
        message.save();
      } catch (e) {
        console.log('Cannot update message!');
      }
    });
  } catch (e) {
    console.log(
      'Tragic failure happend. Cannot retrive messages from database!'
    );
  }
});

module.exports = cron;
