const express = require("express");
const chatbotRouter = require("./chatbotRouter");
const webScrappingRouter = require("./webScrappingRouter");

function chatbotApi(app) {
  router = express.Router();
  app.use("/api/v1", router);
  router.use("/chatbot", chatbotRouter);
  router.use("/web-scrapping", webScrappingRouter);
}

module.exports = chatbotApi;
