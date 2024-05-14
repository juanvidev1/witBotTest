class ChatbotService {
  getWitResponse = async (message) => {
    // console.log("Enter to route");

    let queryURI = `https://api.wit.ai/message?v=20200923&q=${message}`;
    const response = await fetch(encodeURI(queryURI), {
      headers: {
        Authorization: `Bearer ${process.env.WIT_API_KEY}`,
      },
    });
    const data = await response.json();
    // console.log("Datos", data);
    let wikiQueryWord;

    if (
      data.entities &&
      data.entities["wit$wikipedia_search_query:wikipedia_search_query"]
    ) {
      wikiQueryWord =
        data.entities["wit$wikipedia_search_query:wikipedia_search_query"][0]
          .value;
    } else {
      wikiQueryWord = "Not found";
    }
    return wikiQueryWord;
  };
}

module.exports = ChatbotService;
