const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
const isAdmin = require('./middleware/isAdmin')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [Category]})
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.create(req.body)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productForDeletion = await Product.findByPk(req.params.productId)
    await productForDeletion.destroy()
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.productId)
    const updatedProduct = await productToUpdate.update(req.body)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
