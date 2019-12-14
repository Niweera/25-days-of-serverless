const express = require("express");
const router = express.Router();
const request = require("request");
const db = require("../keys").db;
const FIREBASE_API_KEY = require("../keys").FIREBASE_API_KEY;
const ALGOLIA_INDEX_NAME = require("../keys").ALGOLIA_INDEX_NAME;
const algoliaSearchClient = require("../keys").algoliaSearchClient;
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
 * @route GET /eleven
 * @desc Root Endpoint for challenge eleven
 * @access Public
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    rootEndPoint: "/eleven",
    login: "/eleven/login",
    create: "/eleven/add",
    read: "/eleven/list",
    search: "/eleven/find/:query"
  });
});

/**
 * @route POST /eleven/login
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
 * @route POST /eleven/add
 * @desc Add food dishes to the db
 * @access Private
 */
router.post("/add", (req, res) => {
  (async () => {
    try {
      const payload = req.body;
      const description = payload.description;
      const name = payload.name;
      const address = payload.address;
      const type = payload.type;

      if (!payload) {
        return res.status(400).send({
          code: "bad-request",
          message: "Payload is required!"
        });
      }

      if (!description || !name || !address || !type) {
        return res.status(400).send({
          code: "bad-request",
          message: "Description, name, address and type are required!"
        });
      }

      const docRef = await db.collection("northpole_inc").add({
        name: name,
        address: address,
        description: description,
        type: type
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
 * Use the custom middleware to decode the IDToken
 */
router.use(decodeIDToken);

/**
 * @route GET /eleven/list
 * @desc Read all the requests
 * @access Private
 */
router.get("/list", (req, res) => {
  (async () => {
    try {
      const querySnapshot = await db.collection("northpole_inc").get();
      const requests_count = querySnapshot.size;
      const requests =
        querySnapshot.empty || requests_count <= 0
          ? []
          : querySnapshot.docs.map(request => {
              return request.data();
            });

      return res
        .status(200)
        .send({ requests_count: requests_count, data: requests });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

/**
 * @route GET /eleven/find
 * @desc find specific requests
 * @access Private
 */
router.get("/find/:query", (req, res) => {
  (async () => {
    try {
      const query = req.params.query;
      if (!query) {
        return res.status(400).send({
          code: "bad-request",
          message: "Query is required!"
        });
      }

      const index = algoliaSearchClient.initIndex(ALGOLIA_INDEX_NAME);
      const responses = await index.search({
        query
      });

      const hitsCount = responses.nbHits;

      const data =
        hitsCount > 0
          ? responses.hits.map(hit => {
              return {
                address: hit.address,
                description: hit.description,
                name: hit.name,
                type: hit.type
              };
            })
          : [];

      return res.status(200).send({ hits_count: hitsCount, data: data });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  })();
});

module.exports = router;
