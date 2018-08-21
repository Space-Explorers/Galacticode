const router = require('express').Router()
const { User } = require('../db/models')
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

router.get('/:userId/planets', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    user.addPlanet(1)
    const unlockedPlanets = await user.getPlanets({
      attributes: ['id', 'name', 'img']
    })
    res.json(unlockedPlanets)
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
    const isSolved = await user.getChallenges({
      where: {
        id: req.params.challengeId
      }
    })
    isSolved[0] ? res.json(true) : res.json(false)
  } catch (err) {
    next(err)
  }
})
