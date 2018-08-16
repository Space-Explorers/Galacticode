const router = require('express').Router()
const axios = require('axios')
const { Challenge, User } = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {

    const specsFromDB = await Challenge.findById(req.body.problemId, {
      attributes: ['specs', 'points']
    })

    const { data } = await axios.post(
      // 'http://localhost:8081/',
      'https://space-explorers-api.herokuapp.com/',
      {
        code: req.body.code,
        specs: specsFromDB.specs
      }
    )

    const responseInfo = JSON.parse(Buffer.from(data))
    const results = {
      stats: responseInfo.stats,
      tests: responseInfo.suites.suites[0].tests
    }

    const challengeStatus = await axios.get(`/api/users/${req.user.id}/challenges/${req.body.problemId}`) // returns true or false

    if (results.stats.passPercent === 100 && !challengeStatus.data) {
      const points = specsFromDB.points
      const problemId = req.body.problemId

      const user = await User.findById(req.user.id, {
        attributes: ['progress']
      })

      const progress = +points + user.progress

      const [numberOfAffectedRows, affectedRows] = await User.update(
        {
          progress
        },
        {
          where: { id: req.user.id },
          returning: true,
          plain: true
        }
      )
      await affectedRows.addChallenge(problemId)
    } else {
      const failing = results.tests.filter(test => test.pass === 'false')
      const errMsgs = failing.forEach(error => {return error.err.message})
    }

    res.json(results)
  } catch (err) {
    next(err)
  }
})
