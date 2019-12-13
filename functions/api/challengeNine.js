const express = require("express");
const router = express.Router();
const GITHUB_SECRET_KEY = require("../keys").GITHUB_SECRET_KEY;
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: GITHUB_SECRET_KEY
});

/**
 * @route POST /nine
 * @desc Return naughty or nice
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
      const payload = req.body;
      const action = payload.action;
      const issue = payload.issue;
      const repository = payload.repository;
      const sender = payload.sender;

      if (!action || !issue || !repository || !sender) {
        return res.status(200).send({
          code: "ok",
          message: "Ok but the payload data is required!"
        });
      }

      if (action !== "opened") {
        return res.status(200).send({
          code: "ok",
          message: "Ok but the action must be opened!"
        });
      }

      const issue_number = issue.number;
      const repo_owner = repository.owner.login;
      const repository_name = repository.name;
      const sender_id = sender.login;
      const body = `Hey @${sender_id} thank you for creating this issue! Have a Happy holiday season!`;

      await octokit.issues.createComment({
        owner: repo_owner,
        repo: repository_name,
        issue_number: issue_number,
        body: body
      });

      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
