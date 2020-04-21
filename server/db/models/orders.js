const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
