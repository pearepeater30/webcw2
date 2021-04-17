const express = require('express');
const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('Hi There!')
})

module.exports = router;