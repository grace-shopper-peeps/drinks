const User = require('./user')
const Product = require('./product')
const Orders = require('./orders')
const Review = require('./reviews')
const Guest = require('./guest')
const Category = require('./category')
const Cart = require('./cart')
const ProductOrders = require('./product-orders')

Category.hasMany(Product)
Product.belongsTo(Category)

Orders.belongsTo(User)
User.hasMany(Orders)

Guest.belongsTo(Orders)
Orders.hasOne(Guest)

Orders.hasOne(Cart)
Cart.belongsTo(Orders)

User.hasOne(Cart)
Cart.belongsTo(User)

Guest.hasOne(Cart)
Cart.belongsTo(Guest)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Orders.belongsToMany(Product, {through: ProductOrders})
Product.belongsToMany(Orders, {through: ProductOrders})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Orders,
  Review,
  Guest,
  Category,
  ProductOrders
}
