const router = require('express').Router()
const axios = require('axios')
const { Challenge, User } = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {

    const challenge = await Challenge.findById(req.body.problemId, {
      attributes: ['specs', 'points']
    })

    const { data } = await axios.post(
      // 'http://localhost:8081/',
      'https://space-explorers-api.herokuapp.com/',
      {
        code: req.body.code,
        specs: challenge.specs
      }
    )
    const responseInfo = JSON.parse(Buffer.from(data))
    const error = responseInfo.suites.suites[0].tests.filter(test => Object.keys(test.err).length !== 0 && test.err.constructor === Object)

    const user = await User.findById(req.user.id)
    const currentChallenge = await user.getChallenges({
      where: {
        id: req.body.problemId
      }
    })
    const challengeStatus = currentChallenge[0] ? true : false

    const results = {
      stats: responseInfo.stats,
      tests: responseInfo.suites.suites[0].tests,
      error,
      challengeStatus
    }

    if (results.stats.passPercent === 100 && !challengeStatus) {
      const points = challenge.points
      const problemId = req.body.problemId
      const progress = +points + user.progress
      const updatedUser = await user.update({progress})
      await updatedUser.addChallenge(problemId)
    }

    res.json(results)
  } catch (err) {
    next(err)
  }
})
