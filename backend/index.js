require("dotenv").config();
const express = require("express");
const schedule = require("node-schedule");
const { generateEmail } = require("./app/generators/email.generator");
const { getAllUser, hasBeenScammed } = require("./app/firebase/UserApi");
const { sendEmail } = require("./app/sendEmail");
const app = express();
app.listen(process.env.PORT, () => {
  const job = schedule.scheduleJob("0 0 0 5 * *", function () {
    console.log("Running scheduled job to send emails to all users.");
    getAllUser()
      .then((users) => {
        users.forEach((user) => {
          sendEmail(user.email, user.username, user.id);
          console.log(
            `Email sent to ${user.username} (${user.email}) with ID: ${user.id}`
          );
        });
      })
      .catch((error) => {
        console.log("Error fetching users:  " + error.message);
      });
  });
  job.invoke(); // Invoke the job immediately for testing purposes
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/verify/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Verification link clicked for user ID: ${id}`);
  hasBeenScammed(id)
    .then(() => {
      console.log(`User with ID ${id} has been marked as scammed.`);
      res.send(
        `<br/><br/><br/><center><h1>YOU HAVE BEEN SCAMMED BY SCAMBUSTERS!</h1></center> `
      );
    })
    .catch((error) => {
      console.error(
        `Error marking user with ID ${id} as scammed: ${error.message}`
      );
    });
});
module.exports = app;
