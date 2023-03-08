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

    messages.forEach(async (message) => {
      console.log(message);
      const { to, title, content } = message;
      try {
        await sendMessage({ to, title, content });
        message.isSent = true;
        message.save();
      } catch (e) {
        console.log('Cannot update message or send an email!');
      }
    });
  } catch (e) {
    console.log(
      'Tragic failure happend. Cannot retrive messages from database!'
    );
  }
});

module.exports = cron;
