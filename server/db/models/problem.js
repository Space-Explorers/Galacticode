const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
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
})

module.exports = Problem
