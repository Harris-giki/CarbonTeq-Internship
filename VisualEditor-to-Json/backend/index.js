const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/save", (req, res) => {
  const data = req.body;

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); //Convert to JSON with 2-space indentation

  res.json({ message: "Data saved!" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
