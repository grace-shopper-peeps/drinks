const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('throughProductOrders', {
  //   orderId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   productId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchasePrice: {
    //perhaps to keep track of the price at which a product was purchased at? think about when you would populate this column
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: null
  }
})

ProductOrders.beforeCreate((instance, options) => {
  return (instance.purchasePrice = instance.quantity * instance.price)
})
// ProductOrders.afterUpdate((instance, options) => {
//   console.log('hittin beforeUpdate hook!')
//   console.log('instance', instance)
//   return (instance.purchasePrice =
//     Number(instance.quantity) * Number(instance.price))
// })

module.exports = ProductOrders
