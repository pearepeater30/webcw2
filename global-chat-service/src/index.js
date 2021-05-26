const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const start = async () => {
  app.listen(6000, () => {
    console.log("Listening on port 6000!");
  });
};

start();
