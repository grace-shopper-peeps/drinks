const router = require('express').Router()
const Reviews = require('../db/models/reviews')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Reviews.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
//might need to be changed
router.get('/:guestId', async (req, res, next) => {
  try {
    const reviews = await Reviews.findByPk(req.params.guestId)
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const reviews = await Reviews.create(req.body)
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
