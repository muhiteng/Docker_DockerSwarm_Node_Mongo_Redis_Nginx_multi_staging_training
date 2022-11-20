const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const { createClient } = require("redis");
const PORT = process.env.PORT || 4000;

// init app
const app = express();

// connect to Redis
const REDIS_HOST = "redis"; // name of sevice redis in docker-compose
const REDIS_PORT = 6379; // mapping port in redis service  in docker-compose
const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis is connected successfully"));

const connect_redis = async () => {
  await client.connect();
  await client.set("key", "value");
  const value = await client.get("key");
  //await client.disconnect();
};

connect_redis();

// connect MongoDB
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_HOST = "mongo"; // name of service in docker-commpose
const DB_PORT = 27017; // mapping port in mongo service  in docker-compose

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose
  .connect(URI)
  .then(() => console.log("connected to mongodb : successfully"))
  .catch((err) => console.log(err));

// Routes
app.get("/", async (req, res) => {
  console.log(`traffic ${os.hostname}`);
  await client.set("test", "test value");
  res.send("<h1>Hello</h1>");
});
app.get("/test", async (req, res) => {
  const test = await client.get("test");
  res.send(`<h1>Hello: ${test}</h1>`);
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
