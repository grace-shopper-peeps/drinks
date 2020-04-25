const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  }
})

module.exports = Orders
