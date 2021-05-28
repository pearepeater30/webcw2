const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },

    modules: {
      type: [String],
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


module.exports = User;
