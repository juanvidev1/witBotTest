const express = require("express");
const bodyParser = require("body-parser");
const chatbotApi = require("./routes/index.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/api/v1", async (req, res) => {
//   res.send("Hello API!");
// });

// app.get("/wikipedia", async (req, res) => {
//   let wikiQueryWord = req.query.word;
//   let wikiQueryLink = `https://es.wikipedia.org/api/rest_v1/page/summary/${wikiQueryWord}`;
//   let wikiResponse = await fetch(encodeURI(wikiQueryLink));
//   const wikiData = await wikiResponse.json();
//   res.json(wikiData);
// });

chatbotApi(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
