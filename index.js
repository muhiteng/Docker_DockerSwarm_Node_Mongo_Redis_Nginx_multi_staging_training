const express = require("express");
const PORT = 8000;

// init app
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
