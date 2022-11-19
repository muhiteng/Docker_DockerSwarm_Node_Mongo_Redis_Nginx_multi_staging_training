const express = require("express");
const PORT = process.env.PORT || 4000;

// init app
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
