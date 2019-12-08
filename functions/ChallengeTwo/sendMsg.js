const request = require("request");

//pushbullet
const API_KEY = require("../keys").pushbulletAPIKey;

/**
 * Send pushbullet message
 * @param {string} title - title of the message
 * @param {string} message - message body
 * @returns {Promise<void>}
 */
const sendMsg = (title, message) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: "https://api.pushbullet.com/v2/pushes",
      method: "POST",
      headers: {
        "Access-Token": API_KEY,
        "Content-Type": "application/json"
      },
      json: { title: title, body: message, type: "note" }
    };
    request(options, (err, response, body) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = sendMsg;
