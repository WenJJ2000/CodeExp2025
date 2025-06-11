var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  //   secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, content) => {
  var mailOptions = {
    from: "temp@gmail.com",
    to: to,
    subject: subject,
    html: `
    ${content}
`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = { sendEmail };
