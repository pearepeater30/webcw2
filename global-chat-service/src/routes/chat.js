const express = require("express");
const router = express.Router();
const currentUser = require('../middlewares/current-user')
const requireAuth = require('../middlewares/require-auth')

router.get("/", currentUser, requireAuth, (req,res) => {
  res.render("index", {user: req.session.currentUser})
})

module.exports = router;