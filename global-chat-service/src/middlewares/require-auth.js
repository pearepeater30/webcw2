const requireAuth = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).send();
  }
  next();
}

module.exports = requireAuth;