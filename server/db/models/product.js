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
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: '/beer.png'
  }
})

Product.prototype.quantityUpdate = function(qtyNum) {
  return (this.quantity -= qtyNum) //only run when a person has checked out
}
module.exports = Product
