const Sequelize = require('sequelize')
const db = require('../db')

const Planet = db.define('planet', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    unique: true
  },
  lockedImg: {
    type: Sequelize.STRING,
    defaultValue: '/Gray_Planet.png'
  },
  unlockedImg: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Planet
