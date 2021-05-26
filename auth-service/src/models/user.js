const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },

    modules_id: {
      type: String,
      require: false,
    },

    forename: {
      type: String,
      require: false,
    },

    surname: {
      type: String,
      require: false,
    },

    year_joined: {
      type: Number,
      require: false,
    },

    placement: {
      type: Boolean,
      require: false,
    },

    degree_length: {
      type: Number,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      }
    },
  }
);

const User = mongoose.model("Users", userSchema);

new User({
  email: "test@test.com",
  password: "weioagnio;wera",
});

module.exports = User;
