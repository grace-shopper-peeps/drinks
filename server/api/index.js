/* eslint-disable camelcase */
const router = require('express').Router()
const stripe = require('stripe')('sk_test_YQIj5qePE15uWbuDkYb5b4P500Y3P7JdZm')

const Order = require('../db/models/orders')
const User = require('../db/models/User')
module.exports = router

router.use('/users', require('./users'))
router.use('/guests', require('./guests'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/cart', require('./cart'))

router.post('/stripe', async (req, res, next) => {
  //creates the payment intents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: req.body.token.email
    })
    let updateOrd = await Order.findByPk(req.body.token.orderId)
    await updateOrd.update({status: 'Completed'})
    res.json(paymentIntent)
  } catch (err) {
    console.log(err, 'this is a stripe test')
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
