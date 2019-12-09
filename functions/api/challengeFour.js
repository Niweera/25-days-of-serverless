const express = require("express");
const router = express.Router();
const request = require("request");
const db = require("../keys").db;
const FIREBASE_API_KEY = require("../keys").FIREBASE_API_KEY;
const admin = require("../keys").admin;

const MESSAGE =
  "No Firebase ID token was passed as a Bearer token in the Authorization header. Make sure you authorize your request by providing the following HTTP header: Authorization: Bearer <Firebase ID Token>";
/**
 * Decode IDToken Middleware
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const decodeIDToken = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      res.status(403).send({
        code: "unauthorized",
        message: MESSAGE
      });
      return;
    }

    let idToken;
    idToken = req.headers.authorization.split("Bearer ")[1];

    if (!idToken) {
      res.status(403).send({
        code: "unauthorized",
        message: MESSAGE
      });
    }

    req.user = await admin.auth().verifyIdToken(idToken);
    next();
    return;
  } catch (e) {
    res.status(403).send({
      code: "unauthorized",
      message: MESSAGE
    });
  }
};

/**
 * @route GET /four
 * @desc Root Endpoint for challenge four
 * @access Public
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    rootEndPoint: "/four",
    register: "four/register",
    login: "/four/login",
    create: "/four/add",
    read: "/four/list",
    update: "/four/change",
    delete: "/four/remove"
  });
});

/**
 * @route POST /four/register
 * @desc Register
 * @access Public
 */
router.post("/register", (req, res) => {
  (async () => {
    try {
      const payload = req.body;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      const email = payload.email;
      const password = payload.password;

      if (!email || !password) {
        return res.status(400).send({
          code: "bad-request",
          message: "Email, and password are required!"
        });
      }

      const options = {
        uri: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        method: "POST",
        json: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      };

      return request(options, (error, response, body) => {
        if (error) {
          return res.status(500).send({ message: error });
        } else {
          return res.status(200).send(body);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route POST /four/login
 * @desc Login and get the JWT token
 * @access Public
 */

router.post("/login", (req, res) => {
  (async () => {
    try {
      const payload = req.body;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      const email = payload.email;
      const password = payload.password;

      if (!email || !password) {
        return res.status(400).send({
          code: "bad-request",
          message: "Email, and password are required!"
        });
      }

      const options = {
        uri: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        method: "POST",
        json: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      };

      return request(options, (error, response, body) => {
        if (error) {
          return res.status(500).send({ message: error });
        } else {
          return res.status(200).send(body);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * Use the custom middleware to decode the IDToken
 */
router.use(decodeIDToken);

/**
 * @route POST /four/add
 * @desc Add food dishes to the db
 * @access Private
 */
router.post("/add", (req, res) => {
  (async () => {
    try {
      const uid = req.user.uid;
      const email = req.user.email;

      /**
       * @type {object} payload - request payload
       * @property {string} dish_name - name of the dish
       * @property {string} type - type of the dish
       * @property {string} amount - amount of food dish will be brought
       */
      const payload = req.body;
      const dish_name = payload.dish_name;
      const type = payload.type;
      const amount = payload.amount;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      if (!dish_name || !type || !amount) {
        return res.status(400).send({
          code: "bad-request",
          message: "Dish name, type of the dish and the amount are required!"
        });
      }

      const docRef = await db.collection("potluck_food").add({
        uid: uid,
        email: email,
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
 * @route GET /four/list
 * @desc Read the food dishes
 * @access Private
 */
router.get("/list", (req, res) => {
  (async () => {
    try {
      const querySnapshot = await db.collection("potluck_food").get();
      const food_items_count = querySnapshot.size;
      const food =
        querySnapshot.empty || food_items_count <= 0
          ? []
          : querySnapshot.docs.map(foodItem => {
              return foodItem.data();
            });

      return res
        .status(200)
        .send({ food_item_count: food_items_count, data: food });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route PATCH /four/change
 * @desc Change the data in db
 * @access Private
 */
router.patch("/change", (req, res) => {
  (async () => {
    try {
      const uid = req.user.uid;
      const email = req.user.email;

      /**
       * @type {object} payload - request payload
       * @property {string} dish_name - name of the dish
       * @property {string} type - type of the dish
       * @property {string} amount - amount of food dish will be brought
       * @property {string} document_id - DocumentID of the food item to be changed
       */

      const payload = req.body;
      const document_id = payload.document_id;
      const dish_name = payload.dish_name;
      const type = payload.type;
      const amount = payload.amount;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      if (!document_id) {
        return res.status(400).send({
          code: "bad-request",
          message: "document_id is required!"
        });
      }

      if (!dish_name && !type && !amount) {
        return res.status(400).send({
          code: "bad-request",
          message: "Dish name, type of the dish or the amount is required!"
        });
      }

      const docSnapshot = await db
        .collection("potluck_food")
        .doc(document_id)
        .get();

      if (!docSnapshot.exists) {
        return res.status(404).send({
          code: "not-found",
          message: "The document is not found"
        });
      }

      const document_uid = docSnapshot.get("uid");

      if (uid !== document_uid) {
        return res.status(403).send({
          code: "unauthorized",
          message: "Permission denied"
        });
      }

      await docSnapshot.ref.update({
        dish_name: dish_name ? dish_name : docSnapshot.get("dish_name"),
        type: type ? type : docSnapshot.get("type"),
        amount: amount ? amount : docSnapshot.get("amount")
      });

      return res.status(200).send({ message: "Update successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route DELETE /four/remove
 * @desc delete the data in db
 * @access Private
 */
router.delete("/remove", (req, res) => {
  (async () => {
    try {
      const uid = req.user.uid;

      /**
       * @type {object} payload - request payload
       * @property {string} document_id - DocumentID of the food item to be changed
       */

      const payload = req.body;
      const document_id = payload.document_id;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      if (!document_id) {
        return res.status(400).send({
          code: "bad-request",
          message: "document_id is required!"
        });
      }

      const docSnapshot = await db
        .collection("potluck_food")
        .doc(document_id)
        .get();

      if (!docSnapshot.exists) {
        return res.status(404).send({
          code: "not-found",
          message: "The document is not found"
        });
      }

      const document_uid = docSnapshot.get("uid");

      if (uid !== document_uid) {
        return res.status(403).send({
          code: "unauthorized",
          message: "Permission denied"
        });
      }

      await docSnapshot.ref.delete();

      return res.status(200).send({ message: "Remove successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
