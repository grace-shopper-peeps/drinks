const router = require('express').Router()
const Order = require('../db/models/orders')
const isAdmin = require('./middleware/isAdmin')
const User = require('../db/models/user')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: User}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.get('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.orderId, {include: User})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.orderId, {include: User})
    const updated = await orders.update({
      status: req.body.status
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const orders = await Order.create(req.body)
//     res.json(orders)
//   } catch (err) {
//     next(err)
//   }
// })
