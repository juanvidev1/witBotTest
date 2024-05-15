const cheerio = require("cheerio");
const axios = require("axios");

class WebScrappingService {
  async getWebPageData(url, selectorName, ...args) {
    console.log("Into ws route");
    let argsArray = args[0];
    console.log(argsArray);

    const webRes = await axios.get(url);
    const response = webRes.data;

    const $ = cheerio.load(response);
    // const selector = $("div.entry-content");
    const selector = $(selectorName);

    if (selector.length === 0) {
      return {
        message: "No info found with the words provided",
      };
    }

    // Here we set a keywords array using the arguments passed to the function different from url and selector
    const keyWords = [];
    argsArray.forEach((arg) => {
      keyWords.push(arg);
    });

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
