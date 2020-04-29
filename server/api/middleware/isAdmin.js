module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next()
  } else {
    res.status(401).send('you shall not pass!!!')
  }
}
