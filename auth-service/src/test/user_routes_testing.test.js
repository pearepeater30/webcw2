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