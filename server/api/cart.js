const router = require('express').Router()
// const ProductOrders = require('../db')
const Orders = require('../db/models/orders')

router.get('/', async (req, res, next) => {
  //check post and put routes when we get from lunch
  // await ProductOrders.findAll({})
  try {
    // console.log(req.user)
    // console.log('session', req.session)
    const orderExist = await Orders.findAll({
      where: {
        status: 'Created',
        userId: req.user.id
      }
    })
    // console.log('testing ORDER', orderExist[0])
    if (orderExist[0]) {
      orderExist[0].quantity++, (orderExist[0].price += 20)
      res.json(orderExist)
    } else {
      const newOrder = await Orders.create({
        userId: req.user.id,
        status: 'Created',
        quantity: 3,
        price: 20.0
      })
      res.json(newOrder)
    }

    // req.body.orderID = createdOrder.id
    // console.log('REQ BODYDDDDDYYY', req.body)
    // const newProduct = await ProductOrders.create(req.body) //createdOrder.id we need to find some way to merge the req.body and createdOrder.id
    // console.log('New Product', newProduct)
  } catch (err) {
    //migrate session cart to user cart for logged in user , store on session productId and qty

    // if they have drinks in their guest cart and some user cart , figure out how we merge them without being duplicates

    next(err)
  }
})

module.exports = router
