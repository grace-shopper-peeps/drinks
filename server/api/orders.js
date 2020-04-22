const router = require('express').Router()
const Order = require('../db/models/orders')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.get('/:orderId', async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.orderId)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const orders = await Order.create(req.body)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
