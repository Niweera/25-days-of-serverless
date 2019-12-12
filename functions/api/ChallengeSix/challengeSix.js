const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const cloudScheduler = google.cloudscheduler("v1beta1");
const chrono = require("chrono-node");
const bodyParser = require("body-parser");
const signature = require("./verifySignature");
const SLACK_INCOMING_WEB_HOOK = require("../../keys").SLACK_INCOMING_WEB_HOOK;

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) req.rawBody = buf.toString(encoding || "utf8");
};

router.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
router.use(bodyParser.json({ verify: rawBodyBuffer }));

/**
 * @route POST /six
 * @desc Return naughty or nice
 * @access Public
 */
router.post("/", (req, res) => {
  (async () => {
    try {
      if (!signature.isVerified(req)) {
        return res.sendStatus(404);
      }

      /**
       * @type {object} payload
       * @property {string} message - message body
       */
      const payload = req.body;

      if (!payload) {
        return res.status(400).json({
          response_type: "in_channel",
          text: "Message is required!"
        });
      }

      const message = payload.text;

      if (!message) {
        return res.status(400).json({
          response_type: "in_channel",
          text: "Message is required!"
        });
      }

      res.json({
        response_type: "in_channel",
        text: `${message} has been scheduled!`
      });

      const referenceDate = new Date();

      const response = await chrono.parseDate(message, referenceDate, {
        forwardDate: true,
        timezones: { IST: 330 }
      });

      const date = new Date(response);

      const minutes = date.getMinutes();
      const hour = date.getHours();
      const dayOfMonth = date.getDate();
      const month = date.getMonth() + 1;
      const dayOfWeek = date.getDay();

      let buff = new Buffer(
        `{"text":"You scheduled ${message} to happen now"}`
      );
      let base64data = buff.toString("base64");

      const client = await google.auth.getClient({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      });

      const request = {
        parent: "projects/fsuptutorial/locations/us-central1",
        resource: {
          httpTarget: {
            uri: SLACK_INCOMING_WEB_HOOK,
            httpMethod: "POST",
            body: base64data
          },
          schedule: `${minutes} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`,
          timeZone: "Asia/Colombo"
        },

        auth: client
      };

      return cloudScheduler.projects.locations.jobs.create(request, err => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            response_type: "in_channel",
            text: err.message
          });
        }
        return res.status(200).json({
          response_type: "in_channel",
          text: "Event is successfully scheduled!"
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        response_type: "in_channel",
        text: error.message
      });
    }
  })();
});

module.exports = router;
