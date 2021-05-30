const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path")
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PostsRoute = require("./routes/posts");

app.use(cors());

app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use("/posts", PostsRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/posts", (req, res) => {
  res.send("Posts");
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://noodleh:uk0cY811ic@cluster0.m6ge9.mongodb.net/webcw2?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  
  app.listen(4000, () => {
    console.log("Listening on port 4000!");
  });
};

start();

