const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  initialPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Cart
