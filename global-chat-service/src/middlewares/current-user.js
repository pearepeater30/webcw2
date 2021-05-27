const jwt = require("jsonwebtoken");

//currentUser middleware in place in order to load the encrypte jwt content into cookies
const currentUser = (req,res,next) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }
  try{
    const payload = jwt.verify(
      req.session.jwt, 
      "asdf"
    );
    req.session.currentUser = payload;
  }
  catch (err) {
    res.send({ currentUser: null})
  }
  next();
}

module.exports = currentUser;