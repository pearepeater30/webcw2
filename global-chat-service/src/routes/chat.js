const express = require("express");
const router = express.Router();
const currentUser = require('../middlewares/current-user')

router.get("/", currentUser, (req,res) => {
  res.render("index", {user: req.session.currentUser})
})

module.exports = router;