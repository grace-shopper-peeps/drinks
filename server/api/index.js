/* eslint-disable camelcase */
const router = require('express').Router()
const stripe = require('stripe')('sk_test_YQIj5qePE15uWbuDkYb5b4P500Y3P7JdZm')
module.exports = router

router.use('/users', require('./users'))
router.use('/guests', require('./guests'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/cart', require('./cart'))

router.get('/stripe', async (req, res, next) => {
  //creates the payment intents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com'
    })
    res.json(paymentIntent)
  } catch (err) {
    console.log(err, 'this is a stripe test')
  }
})

router.get('/secret', async (req, res, next) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com'
    })
    res.json({clientSecret: intent.client_secret})
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
