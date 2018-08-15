const Sequelize = require('sequelize')
const db = require('../db')

const Challenge = db.define('challenge', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	prompt: {
		type: Sequelize.TEXT
	},
	solution: {
		type: Sequelize.STRING
	},
	specs: {
		type: Sequelize.BLOB
	}
})

module.exports = Challenge
