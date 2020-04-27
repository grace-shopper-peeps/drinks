const router = require('express').Router()
const ProductOrders = require('../db/models/product-orders')
const Product = require('../db/models/product')
const Orders = require('../db/models/orders')
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  if (req.user) {
    const newOrder = await Orders.findAll({
      where: {
        userId: req.user.id,
        status: 'Created'
      },
      include: [
        {
          model: Product,
          through: ProductOrders
        }
      ]
    })

    console.log('NEWW ORDDEEERRR', newOrder[0].products)
    res.json(newOrder[0].products)
  } else {
    res.json(['no cart found'])
  }
})

router.post('/', async (req, res, next) => {
  try {
    const orderExist = await Orders.findAll({
      where: {
        status: 'Created',
        userId: req.user.id
      },
      include: [
        {
          model: Product,
          through: ProductOrders
        }
      ]
    })
    if (orderExist[0]) {
      console.log('LEMMONNNNS')
      const productOrderExist = await ProductOrders.findAll({
        where: {
          orderId: orderExist[0].id,
          productId: req.body.id
        }
      })
      if (productOrderExist[0]) {
        console.log('BERRRIES')
        await ProductOrders.update(
          {quantity: (productOrderExist[0].quantity += req.body.quantity)},
          {
            where: {
              productId: productOrderExist[0].productId,
              orderId: productOrderExist[0].orderId
            }
          }
        )
        const updatedProductOrder = await ProductOrders.findAll({
          where: {
            productId: productOrderExist[0].productId,
            orderId: productOrderExist[0].orderId
          }
        })
        res.json(updatedProductOrder[0])
      } else {
        console.log('COCONNNUUTT')
        req.body.orderId = orderExist[0].id
        res.json(
          await ProductOrders.create({
            orderId: orderExist[0].id,
            productId: req.body.id,
            quantity: req.body.quantity
          })
        )
      }
    } else {
      console.log('FRRRUUIIIIT')
      const newOrder = await Orders.create({
        userId: req.user.id,
        status: 'Created'
      })
      req.body.orderId = newOrder.id
      const firstProduct = await ProductOrders.create({
        orderId: newOrder.id,
        productId: req.body.id,
        quantity: req.body.quantity
      })
      console.log('APPPLLLEEE', firstProduct)
      res.json(firstProduct)
    }
  } catch (err) {
    //migrate session cart to user cart for logged in user , store on session productId and qty

    // if they have drinks in their guest cart and some user cart , figure out how we merge them without being duplicates

    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id)
      const orders = await user.getOrders({where: {status: 'Created'}})
      await orders[0].removeProduct(req.body.id)
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
