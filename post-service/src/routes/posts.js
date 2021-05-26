const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/require-auth");
const currentUser = require("../middlewares/current-user")

router.get("/", async (req, res) => {
  //find all posts
  try {
    const Posts = await Post.find();
    res.json(Posts);
  } catch (err) {
    res.json({ message: err });
  }
});

/** requireAuth middleware in place to make sure only logged in users can access this resource
 *  currentUser middleware also in place to load the encrypte jwt content into cookies
 * */
router.post("/", currentUser, requireAuth, async (req, res) => {
  //getting the current logged in user's id in order to create a relation between post and the user
  const post = new Post({
    UserId: mongoose.Types.ObjectId(req.session.currentUser.id),
    title: req.body.title,
    text: req.body.text,
  });
  //save the post
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
