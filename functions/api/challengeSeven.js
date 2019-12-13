const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
global.fetch = fetch;
const UNSPLASH_ACCESS_KEY = require("../keys").UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = require("../keys").UNSPLASH_SECRET_KEY;
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const unsplash = new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_KEY
});

/**
 * @route POST /seven
 * @desc Return images for the given query
 * @access Public
 */
router.post("/", (req, res) => {
  (async () => {
    try {
      const payload = req.body;
      const query = payload.query;
      const response = await unsplash.search.photos(query, 1, 10, {
        orientation: "portrait"
      });

      const json = await toJson(response);
      const imageURLs =
        json.results.length > 0
          ? json.results.map(result => {
              return result.urls.regular;
            })
          : [];

      return res.status(200).json({
        imageURLs: imageURLs
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: "internal",
        message: error.message
      });
    }
  })();
});

module.exports = router;
