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
    type: Sequelize.DECIMAL(10, 2),
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

Product.prototype.quantityUpdate = function(qtyNum) {
  return (this.quantity -= qtyNum) //only run when a person has checked out
}
module.exports = Product
