class ChatbotService {
  getWitResponse = async (message) => {
    console.log("Enter to route");

    let queryURI = `https://api.wit.ai/message?v=20200923&q=${message}`;
    const response = await fetch(encodeURI(queryURI), {
      headers: {
        Authorization: `Bearer ${process.env.WIT_API_KEY}`,
      },
    });
    const data = await response.json();
    // console.log("Datos", data.entities["wit$wikipedia_search_query:wikipedia_search_query"][0].value);

    if (
      data.entities &&
      data.entities["wit$wikipedia_search_query:wikipedia_search_query"]
    ) {
      let wikiQueryWord =
        data.entities["wit$wikipedia_search_query:wikipedia_search_query"][0]
          .value;

      return wikiQueryWord;
    } else {
      wikiQueryWord = "There's no search word";
      return wikiQueryWord;
    }
  };
}

module.exports = ChatbotService;
