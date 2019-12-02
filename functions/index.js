const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
app.use(cors({ origin: true }));
const options = {
  customCssUrl:
    "https://firebasestorage.googleapis.com/v0/b/fsuptutorial.appspot.com/o/swagger_files_theme-material.css?alt=media&token=6f3a412e-7178-41d6-b23a-198bdd80975b",
  customSiteTitle: "25 Days of Serverless",
  customfavIcon:
    "https://firebasestorage.googleapis.com/v0/b/fsuptutorial.appspot.com/o/favicon.ico?alt=media&token=277f789e-d594-498c-a9fc-bf085b6cf002"
};
const swaggerDocument = YAML.load("../functions/Swagger/openapi.yaml");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

//routes
const main = require("../functions/api/main");

app.use("/", main);

exports.api = functions.https.onRequest(app);
