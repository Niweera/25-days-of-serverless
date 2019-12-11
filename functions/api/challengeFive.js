const express = require("express");
const router = express.Router();
const { Translate } = require("@google-cloud/translate").v2;
const projectId = require("../keys").projectID;
const translate = new Translate({
  projectId,
  keyFilename: "PATH/TO/SERVICE_ACCOUNT_KEY"
});
const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  projectId,
  keyFilename: "PATH/TO/SERVICE_ACCOUNT_KEY"
});

/**
 * @route POST /five
 * @desc Return naughty or nice
 * @access Public
 */
router.post("/", (req, res) => {
  (async () => {
    try {
      /**
       * @type {object} payload
       * @property {string} who - the person who is sent the message
       * @property {string} message - message body
       */
      const payload = req.body;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      const who = payload.who;
      const message = payload.message;

      if (!who || !message) {
        return res.status(400).send({
          code: "bad-request",
          message: "Sender, and message are required!"
        });
      }

      let [detections] = await translate.detect(message);
      const detectedLanguage = detections.language;

      let translation;

      if (detectedLanguage !== "en") {
        [translation] = await translate.translate(message, "en");
      } else {
        translation = message;
      }

      const document = {
        content: translation,
        type: "PLAIN_TEXT"
      };

      const [result] = await client.analyzeSentiment({ document: document });

      const sentiment = result.documentSentiment;
      const sentimentScore = sentiment.score;
      const sentimentMagnitude = sentiment.magnitude;

      let naughtyOrNice;

      if (sentimentScore > 0) {
        naughtyOrNice = "Nice";
      } else if (sentimentScore < 0) {
        naughtyOrNice = "Naughty";
      } else {
        naughtyOrNice = "Neutral";
      }

      return res.status(200).send({
        who: who,
        message: message,
        translation: translation,
        detected_language: detectedLanguage,
        sentiment_magnitude: sentimentMagnitude,
        sentiment_score: sentimentScore,
        naughty_or_nice: naughtyOrNice
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
