const express = require("express");
const WebScrappingService = require("../services/webScrappingService");

const webScrappingRouter = express.Router();
const webScrappingService = new WebScrappingService();

webScrappingRouter.post("/", async (req, res) => {
  try {
    if (!req.body || !req.body.url) {
      return res.status(400).json({
        error: "Error, 'url' in body is mandatory",
      });
    }

    // console.log("Body", req.body);
    const bodyObj = req.body;

    const url = bodyObj.url;
    const selector = bodyObj.selector;

    let argsArray = [];
    Object.entries(bodyObj).forEach(([key, value]) => {
      if (key !== "url" && key !== "selector") {
        argsArray.push(value);
      }
    });

    const response = await webScrappingService.getWebPageData(
      url,
      selector,
      argsArray
    );
    return res.json(response);
  } catch (error) {
    console.error("Error", error);
  }
});

module.exports = webScrappingRouter;
