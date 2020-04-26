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
      },
      include: [
        {
          model: Product,
          through: ProductOrders
        }
      ]
    })

    // console.log('testing ORDER', orderExist[0].products)

    if (orderExist[0]) {
      const selectedProduct = await Product.findAll({
        where: {
          id: req.body.id
        }
      })
      //   if (orderExist[0].products)
      // just adjust the quantity is product already in cart
      //   await ProductOrders.create(req.body)
      const updatedOrder = orderExist[0].addProduct(selectedProduct[0])
      //   console.log('ORANGGGGGESSS', orderExist[0].products)
      res.json(selectedProduct[0])

      console.log('BANANANAS', orderExist)
      console.log('STRRRAWWBBEYEYYY', req.body)
    } else {
      console.log('FRRRUUIIIIT')
      const newOrder = await Orders.create({
        userId: req.user.id,
        status: 'Created'
      })
      newOrder.addProduct(req.body)
      console.log('GRAPESSS', newOrder)
      req.body.orderId = newOrder.id
      await ProductOrders.create(req.body) // the req.body now needs to grab the quantity off of the state and send it back here
      res.json(req.body)
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
