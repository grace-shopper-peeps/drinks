const router = require('express').Router()
const Guest = require('../db/models/guest')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const guests = await Guest.findAll()
    res.json(guests)
  } catch (err) {
    next(err)
  }
})
//might need to be changed
router.get('/:guestId', async (req, res, next) => {
  try {
    const guests = await Guest.findByPk(req.params.guestId)
    res.json(guests)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const guests = await Guest.create(req.body)
    res.json(guests)
  } catch (err) {
    next(err)
  }
})
