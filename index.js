const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("sucessfully connected to DB"))
    .catch((e) => {
      consle.log(e)
      setTimeout(connectWithRetry, 5000)
    });
};

connectWithRetry();


app.get("/", (req, res) => {
  res.send("<h2>Hi there!!!</h2>");
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
