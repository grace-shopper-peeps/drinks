const router = require('express').Router()
const ProductOrders = require('../db/models/product-orders')
const Product = require('../db/models/product')
const Orders = require('../db/models/orders')

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

    console.log('HUUUUUUGGGEE', newOrder)
    res.json(newOrder)
  } else {
    res.json(['no cart found'])
  }

  //   try {
  //     if (req.user) {
  //       req.user.id = 3
  //   const userOrders = await req.user.getOrders()
  //   const dummyOrder = await ProductOrders.findAll({
  //     where: {
  //       orderId: 1,
  //     },
  //     // include: {model: Product},
  //   })
  //   console.log('USERRRR', req.user)
  //   const userOrders = await req.user.getOrders()
  //   console.log('CLAIRESS ORDER', userOrders)

  //       res.json(['honey', 'bee', 'margs'])
  //     }
  //   } catch (err) {
  //     next(err)
  //   }
})

router.post('/', async (req, res, next) => {
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
      ;(orderExist[0].quantity += req.body.quantity),
        (orderExist[0].price += req.body.price)
      req.body.orderId = orderExist[0].id
      await ProductOrders.create(req.body)
      res.json(orderExist[0])

      console.log('BANANANAS', orderExist)
      console.log('STRRRAWWBBEYEYYY', req.body)
    } else {
      const newOrder = await Orders.create({
        userId: req.user.id,
        status: 'Created',
        quantity: req.body.quantity,
        price: req.body.price
      })
      console.log('GRAPESSS', newOrder)
      req.body.orderId = newOrder.id
      await ProductOrders.create(req.body)
      res.json(newOrder)
    }

    // console.log('REQ BODYDDDDDYYY', req.body)
    // const newProductOrder = await ProductOrders.create(req.body) //createdOrder.id we need to find some way to merge the req.body and createdOrder.id
    // console.log('New Product', newProductOrder)
  } catch (err) {
    //migrate session cart to user cart for logged in user , store on session productId and qty

    // if they have drinks in their guest cart and some user cart , figure out how we merge them without being duplicates

    next(err)
  }
})

module.exports = router
