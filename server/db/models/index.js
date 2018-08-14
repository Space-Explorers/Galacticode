const User = require('./user')
const Challenge = require('./challenge')
const Example = require('./example')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.belongsToMany(Challenge, { through: 'SolvedChallenges' })
Challenge.belongsToMany(User, { through: 'SolvedChallenges' })

Challenge.hasMany(Example)
Example.belongsTo(Challenge)

module.exports = {
  Challenge,
  Example,
  User
}
