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

router.get('/filter/:category', async (req, res, next) => {
  try {
    let cat =
      req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)
    let liquor = await Category.findAll({
      where: {
        name: cat
      }
    })
    let prod = await Product.findAll({
      include: [Category],
      where: {
        categoryId: liquor[0].id
      }
    })
    console.log(prod)
    res.json(prod)
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
    console.log('REQ BODYYYYYYYYYYYYYYYYYYYY, ', req.body)
    const product = await Product.create(req.body)
    res.json(product)
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
//needs changing
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.productId)
    const updatedProduct = await productToUpdate.update(req.body)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
