const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMessage({ to, title, content }) {
  const mailDetails = {
    from: process.env.EMAIL,
    to: to,
    subject: title,
    html: `${content}`,
  };

  let info = await transporter.sendMail(mailDetails);
  console.log(info);
}

process.on('SIGUSR2', () => {
  console.log('Closing transport object...');
  transporter.close();
  process.exit();
});

module.exports = sendMessage;
