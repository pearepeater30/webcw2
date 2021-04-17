const express = require('express');
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi There!')
})

module.exports = router;