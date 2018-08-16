const router = require('express').Router()
const { Challenge, Example } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.findAll({
      attributes: ['id', 'name', 'prompt', 'points', 'skillLevel']
    })
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

router.get('/:challengeId', async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId, {
      attributes: ['id', 'name', 'prompt', 'points', 'skillLevel'],
      include: Example
    })
    res.json(challenge)
  } catch (err) {
    next(err)
  }
})
