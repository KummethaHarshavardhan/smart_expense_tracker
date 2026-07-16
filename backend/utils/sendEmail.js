const nodemailer = require('nodemailer');

// Reusable email sender. Uses Gmail here - swap the service/host if you use
// a different provider. Credentials come from .env, never hardcoded.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail "App Password", not your normal login password
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Smart Expense Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
