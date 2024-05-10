import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1", (req, res) => {
  res.send("Hello API!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
