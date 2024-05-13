class WikipediaService {
  getWikiResponse = async (wikiQueryWord) => {
    if (!wikiQueryWord) {
      return {
        title: "No word provided",
        extract: "You need to provide a word",
      };
    }

    let wikiQueryLink = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiQueryWord}`;

    let wikiResponse = await fetch(encodeURI(wikiQueryLink));
    const wikiData = await wikiResponse.json();

    if (wikiData.title === "Not found") {
      return {
        title: "Not found",
        extract: "Not found",
      };
    } else {
      return {
        title: wikiData.title,
        extract: wikiData.extract,
      };
    }
  };
}

module.exports = WikipediaService;
