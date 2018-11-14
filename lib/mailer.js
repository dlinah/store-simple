import nm from 'nodemailer';

const { GMAIL, EMAIL_PASS } = process.env;

const transport = nm.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: GMAIL,
    pass: EMAIL_PASS,
  },
});
const mailer = {
  send(to, subject, html, from = 'store <no-reply@Store.com>') {
    return transport.sendMail({
      from, to, subject, html,
    });
  },
};

export default mailer;
