const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://files.slack.com/files-pri/T024FPYBQ-F01277GCKRT/beer.png'
  }
})

module.exports = Product
