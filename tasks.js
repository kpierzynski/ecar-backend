const cron = require('node-cron');
const sendMessage = require('./sender');

const Message = require('./models/Message');

console.log('Tasks file initialized tasks.');

const per20min = '0 0/20 0 * * * *';
const per1min = '* * * * *';

const mailTask = cron.schedule(per1min, async () => {
  const now = Date.now();

  try {
    const messages = await Message.find({
      isSent: { $gt: 0 },
      whenSend: { $lt: now },
    });

    messages.forEach(async (message) => {
      console.log(message);
      const { to, title, content, cyclic } = message;
      try {
        await sendMessage({ to, title, content });
        message.isSent -= 1;
        message.whenSend += cyclic;
        await message.save();
      } catch (e) {
        console.log('Cannot update message or send an email!');
      }
    });
  } catch (e) {
    console.log('Tragic failure happend. Cannot retrive messages from database!');
  }
});

module.exports = { cron, mailTask };
