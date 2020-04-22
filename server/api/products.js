const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
//might need to be changed
router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.productId)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const products = await Product.create(req.body)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
