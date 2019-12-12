const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

//++++++++++++++++++++API+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = express();
app.use(cors({ origin: true }));
const options = {
  customCssUrl:
    "https://firebasestorage.googleapis.com/v0/b/fsuptutorial.appspot.com/o/swagger_files_theme-material.css?alt=media&token=6f3a412e-7178-41d6-b23a-198bdd80975b",
  customSiteTitle: "25 Days of Serverless",
  customfavIcon:
    "https://firebasestorage.googleapis.com/v0/b/fsuptutorial.appspot.com/o/favicon.ico?alt=media&token=277f789e-d594-498c-a9fc-bf085b6cf002"
};
const swaggerDocument = YAML.load("./Swagger/openapi.yaml");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

//routes
const challengeOne = require("./api/challengeOne");
const challengeThree = require("./api/challengeThree");
const challengeFour = require("./api/challengeFour");
//const challengeFive = require("./api/challengeFive");
// const challengeSix = require("./api/ChallengeSix/challengeSix");
const main = require("./api/main");

app.use("/one", challengeOne);
app.use("/three", challengeThree);
app.use("/four", challengeFour);
//app.use("/five", challengeFive);
// app.use("/six", challengeSix);
app.use("/", main);

exports.api = functions.https.onRequest(app);
//++++++++++++++++++++API+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++Challenge Two - The Scheduler app++++++++++++++++++++++
const tasks = require("./ChallengeTwo");
const tz = "Europe/Stockholm";

exports.taskOne = functions.pubsub
  .schedule("13 of dec 08:00")
  .timeZone(tz)
  .onRun(tasks.taskOneHandler);

exports.taskTwo = functions.pubsub
  .schedule("13 of dec 08:25")
  .timeZone(tz)
  .onRun(tasks.taskTwoHandler);

exports.taskThree = functions.pubsub
  .schedule("13 of dec 08:30")
  .timeZone(tz)
  .onRun(tasks.taskThreeHandler);

exports.taskFour = functions.pubsub
  .schedule("13 of dec 08:35")
  .timeZone(tz)
  .onRun(tasks.taskFourHandler);

exports.taskFive = functions.pubsub
  .schedule("13 of dec 08:39")
  .timeZone(tz)
  .onRun(tasks.taskFiveHandler);

exports.taskSix = functions.pubsub
  .schedule("13 of dec 08:40")
  .timeZone(tz)
  .onRun(tasks.taskSixHandler);

exports.taskSeven = functions.pubsub
  .schedule("13 of dec 08:45")
  .timeZone(tz)
  .onRun(tasks.taskSevenHandler);

exports.taskEight = functions.pubsub
  .schedule("13 of dec 08:49")
  .timeZone(tz)
  .onRun(tasks.taskEightHandler);
//+++++++++++++++++++++++++++++++Challenge Two - The Scheduler app++++++++++++++++++++++
