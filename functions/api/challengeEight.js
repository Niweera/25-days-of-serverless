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
 * @route GET /eight
 * @desc Root Endpoint for challenge eight
 * @access Public
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    rootEndPoint: "/eight",
    login: "/eight/login",
    getDelivery: "/eight/delivery",
    getGuidance: "/eight/guidance",
    patchDelivery: "/eight/delivery",
    patchGuidance: "/eight/guidance"
  });
});

/**
 * @route POST /eight/login
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
 * @route GET /eight/delivery
 * @desc delivery
 * @access Private
 */
router.get("/delivery", (req, res) => {
  (async () => {
    try {
      const doc = await db
        .collection("northpole")
        .doc("DeliverySystem")
        .get();
      const data = doc.data();
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route GET /eight/guidance
 * @desc delivery
 * @access Private
 */
router.get("/guidance", (req, res) => {
  (async () => {
    try {
      const doc = await db
        .collection("northpole")
        .doc("ReinDeerGuidance")
        .get();
      const data = doc.data();
      return res.status(200).send(data);
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
 * @route PATCH /eight/delivery
 * @desc delivery
 * @access Private
 */
router.patch("/delivery", (req, res) => {
  (async () => {
    try {
      const payload = req.body;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      const status = payload.status;

      if (!status) {
        return res.status(400).send({
          code: "bad-request",
          message: "Status is required!"
        });
      }

      if (status !== "Open" && status !== "Closed" && status !== "Ongoing") {
        return res.status(400).send({
          code: "bad-request",
          message: "Status is invalid!"
        });
      }

      await db
        .collection("northpole")
        .doc("DeliverySystem")
        .update({
          status: status
        });
      return res.status(200).send({ message: "Update successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route PATCH /eight/guidance
 * @desc guidance
 * @access Private
 */
router.patch("/guidance", (req, res) => {
  (async () => {
    try {
      const payload = req.body;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      const status = payload.status;

      if (!status) {
        return res.status(400).send({
          code: "bad-request",
          message: "Status is required!"
        });
      }

      if (status !== "Open" && status !== "Closed" && status !== "Ongoing") {
        return res.status(400).send({
          code: "bad-request",
          message: "Status is invalid!"
        });
      }

      await db
        .collection("northpole")
        .doc("ReinDeerGuidance")
        .update({
          status: status
        });
      return res.status(200).send({ message: "Update successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
