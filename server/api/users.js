const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('./middleware/isAdmin')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId)
    const updateUser = users.update(req.body)
    res.json(updateUser)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const users = await User.create(req.body)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    const userForDeletion = await User.findByPk(req.params.userId)
    await userForDeletion.destroy()
    console.log(
      'is this route goind through ??????????????????????????????????????'
    )
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
    next(err)
  }
})

//routes
