class ChatbotService {
  getWitResponse = async (req, res) => {
    console.log("Enter to route");
    const message = req.body.message;
    //   console.log(message);

    if (!message) {
      return res.status(400).send("No message provided");
    }

    let queryURI = `https://api.wit.ai/message?v=20200923&q=${message}`;
    const response = await fetch(encodeURI(queryURI), {
      headers: {
        Authorization: `Bearer ${process.env.WIT_API_KEY}`,
      },
    });
    const data = await response.json();
    //   console.log(typeof data);

    if (
      data.entities &&
      data.entities["wit$wikipedia_search_query:wikipedia_search_query"]
    ) {
      let wikiQueryWord =
        data.entities["wit$wikipedia_search_query:wikipedia_search_query"][0]
          .value;

      let wikiQueryLink = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiQueryWord}`;
      let wikiResponse = await fetch(encodeURI(wikiQueryLink));
      const wikiData = await wikiResponse.json();

      if (wikiData.title === "Not found") {
        let obj = {
          title: "Not found",
          extract: "Not found",
        };
        return res.json(obj);
      } else {
        return res.json({
          title: wikiData.title,
          extract: wikiData.extract,
        });
      }
    }
  };
}
