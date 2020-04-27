const router = require('express').Router()
const {User, Orders} = require('../db/models')
const isAdmin = require('./middleware/isAdmin')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email', 'isAdmin'],
      include: [
        {
          model: Orders
        }
      ]
    })
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId)
    console.log('users', users)
    const updateUser = await users.update({
      isAdmin: true
    })
    console.log(updateUser)
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

router.put('/myProfile/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.user.id)
    console.log('users', users)
    const updateUser = await users.update({
      email: req.body.email
    })
    console.log('updated user', updateUser)
    res.json(updateUser)
  } catch (err) {
    next(err)
  }
})

//routes
