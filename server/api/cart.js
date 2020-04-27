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
    // console.log('LETS SEE THE MAGIC ', orderExist[0].__proto__)
    // console.log('testing ORDER', orderExist[0].products)

    if (orderExist[0]) {
      console.log('LEMMONNNNS')
      const productOrderExist = await ProductOrders.findOne({
        where: {
          orderId: orderExist[0].id,
          productId: req.body.id
        }
      })
      if (productOrderExist) {
        console.log('PEEACHHHESSS')
        // const productUpdate = await ProductOrders.findByPk(
        //   productOrderExist[0].id
        // )
        console.log('productOrderExist', productOrderExist)
        productOrderExist.quantity = req.body.quantity
        const updatedProductOrder = await productOrderExist.save()
        res.json(updatedProductOrder)
        // res.json(
        //   await productUpdate.update({
        //     quantity: req.body.quantity
        //   })
        // )
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
      // Product(req.body.id)
      // console.log('GRAPESSS', newOrder)
      req.body.orderId = newOrder.id
      const firstProduct = await ProductOrders.create({
        orderId: newOrder.id,
        productId: req.body.id,
        quantity: req.body.quantity
      })
      console.log('APPPLLLEEE', firstProduct)
      // the req.body now needs to grab the quantity off of the state and send it back here
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
