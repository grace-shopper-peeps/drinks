const router = require('express').Router()
const ProductOrders = require('../db/models/product-orders')
const Product = require('../db/models/product')
const Orders = require('../db/models/orders')
const User = require('../db/models/user')
const Guest = require('../db/models/guest')
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const newOrder = await Orders.findOrCreate({
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
      if (newOrder[0]) {
        res.json(newOrder[0].products)
      } else {
        res.json([])
      }
    } else {
      if (req.session.order) {
        res.json(req.session.order)
      } else {
        res.json(['something'])
      }
    }
  } catch (err) {}
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      console.log('GRAPPESSS')
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
            {
              quantity: (productOrderExist[0].quantity += req.body.quantity),
              purchasePrice: req.body.totalPrice
            },
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
          await ProductOrders.create({
            orderId: orderExist[0].id,
            productId: req.body.id,
            quantity: req.body.quantity,
            price: req.body.price,
            purchasePrice: req.body.totalPrice
          })
        }
      } else {
        console.log('COCONNNUUTT')
        const newOrder = await Orders.create({
          userId: req.user.id,
          status: 'Created'
        })
        req.body.orderId = newOrder.id
        res.json(
          await ProductOrders.create({
            orderId: newOrder.id,
            productId: req.body.id,
            quantity: req.body.quantity,
            price: req.body.price
          })
        )
      }
    } else {
      if (req.session.order) {
        req.session.order.push({
          quantity: req.body.quantity,
          productId: req.body.id,
          price: req.body.price
        })
        console.log('MONKEY', req.session.order)
        res.json(req.body)
      } else {
        console.log('MANGOOOS')
        req.session.order = [
          {
            quantity: req.body.quantity,
            productId: req.body.id,
            price: req.body.price
          }
        ]
        console.log('APPLESS')
        res.json(req.body)
      }
    }
  } catch (err) {
    next(err)
  }
}) //figure out how to merge products if a person logs-in in the middle of a order

router.put('/', async (req, res, next) => {
  try {
    console.log('GREEEN APPLE', req.body)
    if (req.user) {
      const order = await Orders.findAll({
        where: {
          userId: req.user.id,
          status: 'Created'
        }
      })
      await ProductOrders.update(
        {quantity: req.body.quantity, price: req.body.price},
        {
          where: {
            orderId: order[0].id,
            productId: req.body.id
          }
        }
      )
      const updatedItemQuantity = await ProductOrders.findAll({
        where: {
          productId: req.body.id,
          orderId: order[0].id
        }
      })
      res.json(updatedItemQuantity[0])
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id)
      const orders = await user.getOrders({where: {status: 'Created'}}) //need to figure put why req.body doesn't exist
      // await orders[0].removeProduct(req.body.id)
      await ProductOrders.destroy({
        where: {
          productId: req.body.id,
          orderId: orders[0].id
        }
      })
      res.sendStatus(204)
    } else {
      let indexOfRemovedItem = 0
      for (let i = 0; i < req.session.order.length; i++) {
        let deleteProduct = req.session.order[i]
        if (deleteProduct.productId === req.body.id) {
          indexOfRemovedItem = deleteProduct
        }
      }
      req.session.order.splice(indexOfRemovedItem, 1)
      console.log('STRAWBERRY', req.session.order)
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
