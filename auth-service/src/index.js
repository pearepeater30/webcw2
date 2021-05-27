const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const currentUserRouter = require("./routes/current-user");
const signInRouter = require("./routes/signin");
const signOutRouter = require("./routes/signout");
const signUpRouter = require("./routes/signup");
const errorHandler = require("./middlewares/error-handler");

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
//initiating the cookie session library
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


app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);

//connecting to the database
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
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
