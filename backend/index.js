require("dotenv").config();
const express = require("express");
const schedule = require("node-schedule");
const { generateEmail } = require("./app/generators/email.generator");
const { getAllUser } = require("./app/firebase/UserApi");
const { sendEmail } = require("./app/sendEmail");
const app = express();
app.listen(process.env.PORT, () => {
  const job = schedule.scheduleJob("0 0 * * * *", function () {
    getAllUser()
      .then((users) => {
        console.log("Fetched users :", users);
        generateEmail()
          .then(
            (response) => response.json() // Parse the JSON response
          )
          .then((data) => {
            return data.choices[0].message.content; // Return the parsed data for further processing
          })
          .then((emailData) => {
            users.forEach((user) => {
              if (user.notificationSettings.email) {
                console.log(
                  `Sending email to ${user.email} with content: ${emailData}`
                );
                // Here you would send the email using your preferred email service
              }
            });
          })
          .catch((error) => {
            console.log("Error generating email: " + error.message);
          });
      })
      .catch((error) => {
        console.log("Error fetching users: " + error.message);
      });
  });
  job.invoke(); // Invoke the job immediately for testing purposes
  sendEmail("tanjianfeng01@gmail.com", "test", "test");
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  getAllUser()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).send("Error fetching users: " + error.message);
    });
  // generateEmail()
  //   .then((response) => {
  //     res.send(response);
  //   })
  //   .catch((error) => {
  //     res.status(500).send("Error explaining image: " + error.message);
  //   });
});
module.exports = app;
