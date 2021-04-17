const express = require("express");
const bodyParser = require("body-parser");

const currentUserRouter = require("../routes/current-user");
const signInRouter = require("../routes/signin");
const signOutRouter = require("../routes/signout");
const signUpRouter = require("../routes/signup");

const app = express();

app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
