const express = require('express');
const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  //destroy session
  req.session = null;
  res.send({});
})

module.exports = router;