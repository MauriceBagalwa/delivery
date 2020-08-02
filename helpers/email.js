const nodemailer = require("nodemailer");
const createError = require("http-errors");

function wrapedSendMail(mailOptions) {
  return new Promise((resolve) => {
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mauricebagalwa009@gmail.com",
        pass: "remaurice1kin",
      },
    });
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        resolve(false);
      } else {
        console.log(info);
        resolve(true);
      }
    });
  });
}
module.exports = {
  sendmail: async (req) => {
    const { to, subject, text } = req.body;
    const mailOptions = {
      from: "mauricebagalwa009@gmail.com",
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    };
    let resp = await wrapedSendMail(mailOptions);
    return resp;
  },
};
