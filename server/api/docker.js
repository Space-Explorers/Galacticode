const router = require('express').Router()
const axios = require('axios')
const { Challenge } = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {

    const specsFromDB = await Challenge.findById(req.body.problemId, {
      attributes: ['specs']
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
    res.json(results)
  } catch (err) {
    next(err)
  }
})
