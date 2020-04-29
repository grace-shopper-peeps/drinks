const router = require('express').Router()
const stripe = require('stripe')('sk_test_YQIj5qePE15uWbuDkYb5b4P500Y3P7JdZm')
const Order = require('../db/models/orders')

router.post('/stripe', async (req, res, next) => {
  try {
    console.log(req.body.token, 'req body')
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
module.exports = router
