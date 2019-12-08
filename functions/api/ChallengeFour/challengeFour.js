const express = require("express");
const router = express.Router();
const db = require("../../keys").db;

/**
 * @route GET /four
 * @desc Root Endpoint for challenge four
 * @access Public
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    rootEndPoint: "/four",
    create: "/four/add",
    read: "/four/list",
    update: "/four/change",
    delete: "/four/remove"
  });
});

/**
 * @route POST /four/add
 * @desc Add food dishes to the db
 * @access Public
 */
router.post("/add", (req, res) => {
  (async () => {
    try {
      /**
       * @type {object} payload - request payload
       * @property {string} name - name of the requester
       * @property {string} dish_name - name of the dish
       * @property {string} type - type of the dish
       * @property {string} amount - amount of food dish will be brought
       */
      const payload = req.body;
      const name = payload.name;
      const dish_name = payload.dish_name;
      const type = payload.type;
      const amount = payload.amount;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      if (!name || !dish_name || !type || !amount) {
        return res.status(400).send({
          code: "bad-request",
          message:
            "Name, dish name, type of the dish and the amount is required!"
        });
      }

      const docRef = await db.collection("potluck_food").add({
        name: name,
        dish_name: dish_name,
        type: type,
        amount: amount
      });

      return res
        .status(200)
        .send({ message: "successfully added", documentID: docRef.id });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route GET /*
 * @desc Return 404 for all unidentified routes
 * @access Public
 */
const fourNaughtFour = {
  message: "not-found"
};
router.get("*", (req, res) => {
  res.status(404).json(fourNaughtFour);
});

module.exports = router;
