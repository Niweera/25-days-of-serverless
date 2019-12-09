const express = require("express");
const router = express.Router();

/**
 * @route GET /
 * @desc Root Endpoint
 * @access Public
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    rootEndPoint: "/",
    challengeOne: "/one",
    challengeFour: "/four",
    apiDocumentation: "/api-docs/"
  });
});

// @route   GET /*
// @desc    Return 404 for all unidentified routes
// @access  Public
const fourNaughtFour = {
  message: "not-found"
};
router.get("*", (req, res) => {
  res.status(404).json(fourNaughtFour);
});

module.exports = router;
