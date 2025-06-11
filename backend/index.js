require("dotenv").config();
const express = require("express");
const schedule = require("node-schedule");
const {
  explainImage,
  generateEmail,
} = require("./app/generators/email.generator");
const { getAllUser } = require("./app/firebase/UserApi");
const app = express();
app.listen(process.env.PORT, () => {
  const job = schedule.scheduleJob("0 0 * * * *", function () {
    getAllUser()
      .then((users) => {
        console.log("Fetched users :", users);
      })
      .catch((error) => {
        console.log("Error fetching users: " + error.message);
      });
  });
  job.invoke(); // Invoke the job immediately for testing purposes

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
