const express = require('express');
const router = express.Router();
const { body, validationResult} = require('express-validator')

router.post('/api/users/signin',
 [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log('Creating an account')
})

module.exports = router;