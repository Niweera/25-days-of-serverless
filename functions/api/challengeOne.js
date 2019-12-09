const express = require("express");
const router = express.Router();

/**
 * @route GET /one
 * @desc Challenge one
 * @access Public
 */
router.get("/", (req, res) => {
  (async () => {
    try {
      //get the time in seconds
      const dateObj = new Date();
      const seconds = dateObj.getSeconds();
      const ipAddress = req.ip || "127.0.0.1";
      const ipAddressWODots = ipAddress.replace(/[a-z.:]/g, "");

      const number = ipAddressWODots + seconds;

      const randomNumber = number % 4;

      let letter;

      switch (randomNumber) {
        case 1:
          letter = "נ";
          break;
        case 2:
          letter = "ג";
          break;
        case 3:
          letter = "ה";
          break;
        default:
          letter = "ש";
          break;
      }

      return res.status(200).send({ letter: letter });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
