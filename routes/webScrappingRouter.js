const express = require("express");
const WebScrappingService = require("../services/webScrappingService");

const webScrappingRouter = express.Router();
const webScrappingService = new WebScrappingService();

webScrappingRouter.post("/", async (req, res) => {
  try {
    const url = req.body.url;
    const response = await webScrappingService.getWebPageData(url);
    return res.json(response);
  } catch (error) {
    console.error("Error", error);
  }
});

module.exports = webScrappingRouter;
