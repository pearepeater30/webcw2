const express = require("express");
const router = express.Router();
const currentUser = require('../middlewares/current-user')
const requireAuth = require('../middlewares/require-auth')

router.get("/", currentUser, requireAuth, (req,res) => {
  res.render("chat", {user: req.session.currentUser})
})

router.get("/lobby", currentUser, requireAuth, (req,res) => {
  res.render("enter",{ module_chats: req.session.currentUser.modules})
})

module.exports = router;