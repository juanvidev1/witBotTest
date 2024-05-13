const cheerio = require("cheerio");
const axios = require("axios");

class WebScrappingService {
  async getWebPageData(url) {
    console.log("Into ws route");
    if (!url) {
      console.log("Takes the if");
      return {
        error: "An url is mandatory",
      };
    }

    const webRes = await axios.get(url);
    const response = webRes.data;

    const $ = cheerio.load(response);
    const selector = $("div.entry-content");

    if (selector.length === 0) {
      return {
        message: "No info found with the words provided",
      };
    }

    const keyWords = ["strike", "Apple", "Maryland", "Bloomberg"];
    let results = [];

    keyWords.forEach((word) => {
      const elements = selector.find(`*:contains("${word}")`);
      //   console.log("Elements", elements);
      //   console.log(`Results for "${word}":`);
      elements.each((index, element) => {
        // Prints element text that contains the key word
        //   console.log($(element).text().trim());
        let finalElement = $(element).text().trim();
        let obj = {
          word: word,
          message: finalElement,
        };
        results.push(obj);
      });
      //   console.log("------");
    });
    return {
      info: results,
    };
  }
}

module.exports = WebScrappingService;
