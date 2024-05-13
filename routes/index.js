const express = require("express");
const chatbotRouter = require("./chatbotRouter");

function chatbotApi(app) {
  router = express.Router();
  app.use("/api/v1", router);
  router.use("/chatbot", chatbotRouter);
}

module.exports = chatbotApi;
