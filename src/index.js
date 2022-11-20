const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

// init app
const app = express();

// connect MongoDB
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo"; // name of service in docker-commpose

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose
  .connect(URI)
  .then(() => console.log("connected to mongodb : successfully"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
