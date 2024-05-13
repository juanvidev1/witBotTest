const express = require("express");
const ChatbotService = require("../services/chatbotService");
const WikipediaService = require("../services/wikipediaService");

const chatbotRouter = express.Router();
const chatbotService = new ChatbotService();
const wikiService = new WikipediaService();

chatbotRouter.post("/", async (req, res) => {
  try {
    const q = req.body.message;

    const botWord = await chatbotService.getWitResponse(q);

    const resp = await wikiService.getWikiResponse(botWord);

    return res.json(resp);
  } catch (error) {
    console.error(error);
  }
});

module.exports = chatbotRouter;
