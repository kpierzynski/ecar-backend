const cron = require('node-cron');
const Message = require('./models/Message');

console.log('Tasks file initialized tasks.');

cron.schedule('* * * * *', async () => {
  try {
    const messages = await Message.find({ isSent: false });

    messages.forEach((message) => {
      console.log(message.to);
    });
  } catch (e) {
    console.log(
      'Tragic failure happend. Cannot retrive messages from database!'
    );
  }
});

module.exports = cron;
