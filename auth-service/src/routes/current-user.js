const express = require("express");
const currentUser = require("../middlewares/current-user")
const requireAuth = require("../middlewares/require-auth")

const router = express.Router();

//use the middleware to get the information belonging to the current user and makes sure they are authenticated before they have access to this route
router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
 res.send(req.session.currentUser || null);
});

module.exports = router;
