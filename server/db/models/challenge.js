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
		type: Sequelize.TEXT
	},
	specs: {
		type: Sequelize.BLOB
	},
	points: {
		type: Sequelize.INTEGER
	},
	skillLevel: {
		type: Sequelize.ENUM('Easy', 'Medium', 'Hard')
	}
})

module.exports = Challenge
