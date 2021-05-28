const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.get("/api/users/signin", (req, res) => {
  res.render("signin");
});

//login route
router.post(
  "/api/users/signin",
  [
    //form checking used to check if their is a valid email in the username section
    body("username").isEmail().withMessage("Email must be Valid"),
    //password checking to make sure it is not empty
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must Supply A Password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //throw error on invalid password and email
    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password");
    }

    //get email and password from the body of the form
    const { username, password } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new Error("Account does not exist");
    }

    //creating a jwt token upon login
    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) throw err;

      //checking if the two password match upon login.
      if (isMatch) {
        //creating the user's jwt signature
        const userJwt = jwt.sign(
          {
            id: existingUser._id,
            email: existingUser.username,
            forename: existingUser.forename,
            surname: existingUser.surname,
            modules: existingUser.modules
          },
          //key used to encrypt the jwt, need to create a safe one and store it in config file.
          "asdf"
        );
        //store jwt in cookie session
        req.session = {
          jwt: userJwt,
        };
        res.status(200).send(existingUser);
      }
    });
  }
);

module.exports = router;
