const router = require('express').Router()
const { User } = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get('/:userId/progress', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      attributes: ['progress']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


router.get('/:userId/challenges', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const challenges = await user.getChallenges({
      attributes: ['id']
    })
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/challenges/:challengeId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const solved = await user.getChallenges({
      where: {
        id: req.params.challengeId
      }
    })
    res.json(solved)
  } catch (err) {
    next(err)
  }
})
