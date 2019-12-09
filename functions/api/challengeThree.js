const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../keys").db;

/**
 * @route POST /three
 * @desc Challenge Three
 * @access Public
 */
router.post("/", (req, res) => {
  (async () => {
    try {
      if (!req.body) {
        return res
          .status(400)
          .send({ code: "bad-request", message: "Request body undefined" });
      }

      /**
       * @type {object} payload - GitHub Webhook Payload object
       * @property {object} commits
       * @property {string} repository.html_url
       */

      const payload = req.body;
      const commits = payload.commits;

      if (!commits) {
        return res.status(400).send({
          code: "bad-request",
          message: "Commits data in payload is required!"
        });
      }

      const baseURL = payload.repository.html_url;

      if (!baseURL) {
        return res.status(400).send({
          code: "bad-request",
          message: "Base URL in payload is required!"
        });
      }

      const branch = payload.ref.split("/")[2];

      if (!branch) {
        return res.status(400).send({
          code: "bad-request",
          message: "Branch in payload is required!"
        });
      }

      const commitPromises = commits.map(async commit => {
        /**
         * @type {object} commit - commit data
         * @property {array} added - array containing added files
         */
        let files = commit.added;

        const filePromises =
          files && files.length > 0
            ? files.map(file => {
                let extension = path.extname(file);

                if (extension === ".png") {
                  let url = `${baseURL}/blob/${branch}/${file}`;
                  return db.collection("images_data").add({
                    imageURL: url,
                    filePath: file,
                    fieName: file.split("/").slice(-1)[0]
                  });
                } else {
                  return null;
                }
              })
            : null;

        await Promise.all(filePromises);
      });

      await Promise.all(commitPromises);

      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
