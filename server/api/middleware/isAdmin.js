module.exports = (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.isAdmin === true) {
    next()
  } else {
    res.status(401).send('you shall not pass!!!')
  }
}
