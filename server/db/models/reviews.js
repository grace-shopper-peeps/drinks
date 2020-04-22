const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.DECIMAL(1.0, 5.0)
  }
})

module.exports = Review
