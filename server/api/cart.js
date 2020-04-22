const router = require('express').Router()

router.get('/', async (req, res, next) => {
  console.log(req.user)
  console.log('session', req.session)
  if (!req.session.cart) {
    req.session.cart = 3
  } else {
    req.session.cart++
  }
  res.json('Hello')
})

module.exports = router
