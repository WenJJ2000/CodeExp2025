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

const sendEmail = async (to, username, id) => {
  var mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: to,
    subject: `🚨 Urgent: Verify Your Account to Avoid Suspension`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Account Verification Required</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      padding: 30px;
    }
    h2 {
      color: #2c3e50;
    }
    .alert {
      background-color: #ffdddd;
      border-left: 6px solid #f44336;
      padding: 10px;
      margin: 20px 0;
      font-weight: bold;
    }
    .reward {
      background-color: #e8f5e9;
      border-left: 6px solid #4caf50;
      padding: 10px;
      margin: 20px 0;
    }
    ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    footer {
      font-size: 0.9em;
      color: #555;
      margin-top: 30px;
    }
    .disclaimer {
      color: #c0392b;
      font-size: 0.85em;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Dear ${username},</h2>
    <p>We recently noticed unusual activity on your account and, for your protection, have temporarily limited access. To restore full access and ensure there has been no unauthorized use, we require you to verify your account information.</p>

    <div class="alert">
      🛑 Please note, failure to verify your account within 24 hours will result in permanent suspension. 🛑
    </div>

    <div class="reward">
      🎁 To thank you for your prompt attention, we will upgrade your account to our premium services for the next 3 months, absolutely free!
    </div>

    <p>🔒 <strong>To verify your account, please click the secure link below:</strong> 🔒</p>
    <p><a href="https://www.yourcompanyname.com/verify/${id}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">🔗 Verify My Account</a></p>

    <p>🌟 Once verified, your account will be upgraded, and you can enjoy exclusive benefits and features.</p>

    <p>Thank you for your time and cooperation. We value your business and look forward to serving you with our premium services.</p>

    <footer>
      <p>Best Regards,</p>
      <p><strong>SalonFlow</strong><br>
      Customer Service Team<br>
      📞 +65 6509 1550<br>
      📧 salonflow@zohomail.com</p>

      <p class="disclaimer">🚫 Never share sensitive information via email. This email is for educational purposes only.</p>
    </footer>
  </div>
</body>
</html>

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
