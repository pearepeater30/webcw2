const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://noodleh:uk0cY811ic@cluster0.m6ge9.mongodb.net/webcw2test?retryWrites=true&w=majority";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("User model test", () => {
  beforeAll(async () => {
    console.log("opening");
    await mongoose.connect(mongodb);
  }, 30000);

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  }, 30000);

  test("should insert a user into collection", async () => {
    const mockUser = new User({
      username: "some-username",
      password: "password",
    });

    await mockUser.save();

    await User.findOne({ username: "some-username" }).then((user) => {
      expect(user.username).toEqual(mockUser.username);
    });
  }, 30000);

  test("should encrypt password properly", () => {
    const password = "password";

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
          if (err) throw err;

          expect(isMatch).toBeTruthy();
        });
      });
    });
  }, 30000);

  test("jwt should be encrypted and decrypted properly", async () => {
    const mockUser = new User({
      username: "some-username",
      password: "password",
      forename: "First Name",
      surname: "Last Name",
    });

    await mockUser.save();

    const userJWT = jwt.sign({
      id: mockUser._id,
      username: mockUser.username,
      forename: mockUser.forename,
      surname: mockUser.surname, 
    },
    "ahashingkey");

    
    await User.findOne({ username: "some-username" }).then((user) => {
      const payload = jwt.verify(
        userJWT,
        "ahashingkey"
      )
      const verifiedJWT = payload;
      expect(verifiedJWT.username).toEqual(user.username);
    });
  }, 30000);

  test
});
